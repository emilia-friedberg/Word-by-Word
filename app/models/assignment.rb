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
    end
    all_prompts
  end

  def completed?(student)
    # attempted_prompts = []
    # self.prompts.each do |prompt|
    #   attempted_prompts << prompt if !student.attempts.where(prompt_id: prompt.id).empty?
    # end
    # if self.completion_number.nil?
    #   completion_number = self.prompts.length
    # else
    #   completion_number = self.completion_number
    # end
    # return true if attempted_prompts.length === completion_number

    # prompts = self.lesson.prompts

    stu_prids = student.attempts.where(correct?: true).pluck(:prompt_id)
    num_correct = self.lesson.prompts.pluck(:id).select { |pid| stu_prids.include?(pid)}.length

    if self.completion_number
      return true if num_correct >= self.completion_number
    else
      return true if num_correct >= 10
    end
    return false
  end

  def score(student)
    score = self.prompts.map { |prompt| student.attempts.find_by(prompt_id: prompt.id).correct? }.length
  end

  validates :cohort_id, presence: true
  validates :lesson_id, presence: true
  validates :due_date, presence: true

end
