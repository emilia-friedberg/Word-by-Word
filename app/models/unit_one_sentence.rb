class UnitOneSentence < ApplicationRecord
  belongs_to :lesson
  has_many :unit_one_prompts

  validates :content, presence: true
end
