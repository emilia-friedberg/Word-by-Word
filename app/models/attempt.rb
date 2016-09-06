class Attempt < ApplicationRecord
  belongs_to :scholar, polymorphic: true
  belongs_to :prompt, polymorphic: true

  def prompt
    UnitOnePrompt.find(self.prompt_id)
  end

  validates  :scholar_id, presence: true
end
