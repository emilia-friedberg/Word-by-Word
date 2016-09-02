class CreateCohortStudents < ActiveRecord::Migration[5.0]
  def change
    create_table :cohort_students do |t|
      t.integer :cohort_id, null: false
      t.integer :student_id, null: false

      t.timestamps
    end
  end
end
