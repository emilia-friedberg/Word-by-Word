class Attempt < ApplicationRecord
  belongs_to :scholar, polymorphic: true
  belongs_to :prompt, polymorphic: true

  validates :correct?, :scholar_id, presence: true
end
