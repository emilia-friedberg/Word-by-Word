class CreateChildren < ActiveRecord::Migration[5.0]
  def change
    create_table :children do |t|
      t.integer :teacher_id, null: false
      t.integer :cohort_id
      t.integer :access_code, null:false

      t.timestamps
    end
  end
end
