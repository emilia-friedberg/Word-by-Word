class UnitOneSentence < ApplicationRecord
  belongs_to :lesson
  has_many :unit_one_prompts

  def prompts
    self.unit_one_prompts
  end

  validates :content, presence: true
end
