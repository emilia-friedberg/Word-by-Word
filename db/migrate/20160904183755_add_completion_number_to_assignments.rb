class AddCompletionNumberToAssignments < ActiveRecord::Migration[5.0]
  def change
    add_column :assignments, :completion_number, :integer
  end
end
