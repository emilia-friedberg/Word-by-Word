class UnitOneSentence < ApplicationRecord
  belongs_to :lesson
  has_many :unit_one_prompts

  def prompts
    UnitOnePrompt.where(unit_one_sentence_id: self.id)
  end

  validates :content, presence: true
end
