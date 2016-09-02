class CohortTeacher < ApplicationRecord
  belongs_to :cohort
  belongs_to :teacher

  validates :cohort_id, :teacher_id, presence: true
end
