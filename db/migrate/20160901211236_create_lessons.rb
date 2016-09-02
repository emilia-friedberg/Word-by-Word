class CreateLessons < ActiveRecord::Migration[5.0]
  def change
    create_table :lessons do |t|
      t.string :name,   null: false
      t.integer :unit_id, null: false
      t.string :common_core_standard

      t.timestamps
    end
  end
end
