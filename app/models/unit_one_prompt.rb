class UnitOnePrompt < ApplicationRecord
  belongs_to :unit_one_sentence
  has_many :attempts, as: :prompt

  def sentence
    UnitOneSentence.find(self.unit_one_sentence_id)
  end

  validates :unit_one_sentence_id, :answer, presence: true


end
