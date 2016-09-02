class UnitOnePrompt < ApplicationRecord
  belongs_to :unit_one_sentence
  has_many :attempts, as: :prompt

  validates :unit_one_sentence_id, :answer, presence: true


end
