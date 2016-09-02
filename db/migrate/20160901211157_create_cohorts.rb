class CreateCohorts < ActiveRecord::Migration[5.0]
  def change
    create_table :cohorts do |t|
      t.string :access_code, null: false
      t.string :name,        null: false

      t.timestamps
    end
  end
end
