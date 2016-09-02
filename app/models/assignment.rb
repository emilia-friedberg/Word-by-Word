class Assignment < ApplicationRecord
  belongs_to :cohort
  belongs_to :lesson

  validates :cohort_id, presence: true
  validates :lesson_id, presence: true

end
