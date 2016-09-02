class CohortStudent < ApplicationRecord
  belongs_to :cohort
  belongs_to :student

  validates :cohort_id, :student_id, presence: true
end
