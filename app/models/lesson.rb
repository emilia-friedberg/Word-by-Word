class Lesson < ApplicationRecord
  belongs_to :unit
  has_many :unit_one_sentences

  validates :name, presence: true, length: { maximum: 75 }
  validates :unit_id, presence: true

  def sentences
    UnitOneSentence.where(lesson_id: id)
  end

  def prompts
    all_prompts = []

    self.sentences.each do |sentence|
      sentence.prompts.each do |prompt|
        all_prompts << prompt
      end
    end
    all_prompts
  end

  def prompt_ids
    self.sentences.map { |sen| sen.prompts.pluck(:id) }.flatten.sort
  end

  def attempts
    all_attempts = []

    self.prompts.each do |prompt|
      prompt.attempts.each do |attempt|
        all_attempts << attempt
      end
    end
    all_attempts
  end

  def completed?(student)
    attempted_prompts = []
    self.prompts.each do |prompt|
      attempted_prompts << prompt if !student.attempts.where(prompt_id: prompt.id).empty?
    end
    return true if attempted_prompts.length === self.prompts.length
    return false
  end

  def score(student)
    score = self.prompts.map do |prompt|
       student.attempts.find_by(prompt_id: prompt.id).correct? if student.attempts.find_by(prompt_id: prompt.id)
    end.length
  end

  def mastered?(student)
    self.attempts.select { |attempt| attempt[:scholar_id] = student.id}.last(10).all? { |attempt| attempt.correct? }
  end

end
