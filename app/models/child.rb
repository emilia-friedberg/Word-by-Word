class Child < ApplicationRecord
  belongs_to :teacher
  belongs_to :cohort

  has_many :assignments, through: :cohort
  has_many :attempts, as: :scholar

  def attempts
    Attempt.where(scholar_id: id, scholar_type: 'Child')
  end


  validates :teacher_id, :access_code, presence: true, length: { maximum: 25 }
end
