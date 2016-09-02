class Lesson < ApplicationRecord
  belongs_to :unit
  has_many :unit_one_sentences

  validates :name, presence: true, length: { maximum: 75 }
  validates :unit_id, presence: true

  def sentences
    UnitOneSentence.all
  end
end
