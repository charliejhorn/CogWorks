class CreateBikes < ActiveRecord::Migration[8.0]
  def change
    create_table :bikes do |t|
      t.string :description

      t.timestamps
    end
  end
end
