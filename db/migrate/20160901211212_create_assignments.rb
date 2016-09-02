class CreateAssignments < ActiveRecord::Migration[5.0]
  def change
    create_table :assignments do |t|
      t.integer :cohort_id,     null: false
      t.integer :lesson_id,     null: false 
      t.datetime :due_date
      t.timestamps
    end
  end
end
