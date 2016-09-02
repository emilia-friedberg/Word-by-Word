class Teacher < User
  has_many :cohort_teachers
  has_many :cohorts, through: :cohort_teachers
  has_many :students, through: :cohorts
end
