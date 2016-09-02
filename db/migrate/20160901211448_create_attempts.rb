class CreateAttempts < ActiveRecord::Migration[5.0]
  def change
    create_table :attempts do |t|
      t.boolean  :correct?, null: false

      t.string :prompt_type
      t.integer :prompt_id

      t.integer :scholar_id
      t.string :scholar_type

      t.timestamps
    end
  end
end
