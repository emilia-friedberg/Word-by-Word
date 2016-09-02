class CreateCohortTeachers < ActiveRecord::Migration[5.0]
  def change
    create_table :cohort_teachers do |t|
      t.integer :cohort_id, null: false
      t.integer :teacher_id, null: false

      t.timestamps
    end
  end
end
