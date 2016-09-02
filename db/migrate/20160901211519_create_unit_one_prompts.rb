class CreateUnitOnePrompts < ActiveRecord::Migration[5.0]
  def change
    create_table :unit_one_prompts do |t|
      t.integer :unit_one_sentence_id, null: false
      t.text :text
      t.string :answer_type
      t.string :answer, null: false
      t.timestamps
    end
  end
end
