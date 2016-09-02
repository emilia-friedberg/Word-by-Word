class CreateUnitOneSentences < ActiveRecord::Migration[5.0]
  def change
    create_table :unit_one_sentences do |t|
      t.text :content, null: false 
      t.integer :lesson_id
      t.timestamps
    end
  end
end
