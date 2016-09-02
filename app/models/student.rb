class Student < User
  has_many :attempts
  has_many :cohort_students
  has_many :cohorts, through: :cohort_students
  has_many :teachers, through: :cohorts

end
