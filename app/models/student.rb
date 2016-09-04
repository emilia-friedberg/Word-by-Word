class Student < User
  has_many :attempts
  has_many :cohort_students
  has_many :cohorts, through: :cohort_students
  has_many :teachers, through: :cohorts
  has_many :assignments, through: :cohorts
  def attempts
    Attempt.where(scholar_id: id, scholar_type: 'Student')
  end

  def assignments
    assignments = []
    self.cohorts.each do |cohort|
      cohort.assignments.each do |assignment|
        assignments << assignment
      end
    end
    return assignments
  end

end
