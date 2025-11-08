class CreateJobs < ActiveRecord::Migration[8.0]
  def change
    create_table :jobs do |t|
      t.datetime :due_date
      t.float :cost
      t.string :status

      t.timestamps
    end
  end
end
