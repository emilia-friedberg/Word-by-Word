class Child < ApplicationRecord
  belongs_to :teacher
  belongs_to :cohort

  validates :teacher_id, :access_code, presence: true, length: { maximum: 25 }
end
