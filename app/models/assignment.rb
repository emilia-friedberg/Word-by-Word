class Assignment < ApplicationRecord
  belongs_to :cohort
  belongs_to :lesson

  def overdue?
    return true if self.due_date.past?
    return false
  end

  def prompts
    all_prompts = []

    self.lesson.sentences.each do |sentence|
      sentence.prompts.each do |prompt|
        all_prompts << prompt
      end
      all_prompts
    end
    p all_prompts
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
    score = self.prompts.map { |prompt| student.attempts.find_by(prompt_id: prompt.id).correct? }.length
  end

  validates :cohort_id, presence: true
  validates :lesson_id, presence: true

end
