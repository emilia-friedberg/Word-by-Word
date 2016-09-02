class Unit < ApplicationRecord
  has_many :lessons

  validates :name, presence: true, length: { maximum: 75 }
end
