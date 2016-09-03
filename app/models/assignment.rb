class Assignment < ApplicationRecord
  belongs_to :cohort
  belongs_to :lesson

  def overdue?
    return true if this.due_date.past?
    return false
  end

  validates :cohort_id, presence: true
  validates :lesson_id, presence: true

end
