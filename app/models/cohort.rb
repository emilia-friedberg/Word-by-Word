class Cohort < ApplicationRecord
  has_many :cohort_students
  has_many :cohort_teachers
  has_many :students, through: :cohort_students
  has_many :teachers, through: :cohort_teachers
  has_many :assignments

  validates :name, presence: true, length: { maximum: 75 }
  validates :access_code, presence: true, length: { maximum: 50 }

  def tally_students_with_overdue_assignments
    self.students.select { |student| student.has_overdue_assignment?(self) }.length
  end

  def tally_students_with_completed_assignment(assignment)
    lesson_prompts = assignment.lesson.sentences.map {|sen| sen.prompts.map {|prompt| prompt.id } }
    count = 0
    for student in self.students
      # student.attempts_by_lesson(assignment.lesson).select {}

      corrects = student.attempts.where(correct?: true ).select do |attempt|
        lesson_prompts.include?(attempt.prompt_id)
      end

      if corrects
        num_correct = corrects.length
        if num_correct
          if assignment.completion_number
            count += 1 if num_correct >= assignment.completion_number
          end
        end
      end
    end

    return count
  end


  def total_comp(student)
    assignments = self.assignments
    count = 0
    assignments.each do |ass|
      pr_ids = ass.lesson.prompts.pluck(:id)
      total_correct_attempts = student.attempts.where(correct?: true)
      tot_cor_in_prids = total_correct_attempts.select { |atm| pr_ids.include?(atm.prompt_id)  }
      the_num = tot_cor_in_prids.length

      if ass.completion_number
        count += 1 if the_num >= ass.completion_number
      else
        count += 1 if the_num >= 10
      end
      # count += 1 if student.attempts.where(correct?: true).select { |atm| pr_ids.include?(atm.prompt_id) }.length >= assignment.completion_number
    end
    
    return count
  end


end
