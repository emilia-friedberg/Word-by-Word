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
    # self.students.select { |student| student.completed_assignments.include?(assignment)}.length
    self.students.select { |student| assignment.completed?(student) }.length
  end

end
