class CreateNotes < ActiveRecord::Migration[8.0]
    def change
        create_table :notes do |t|
            t.string :text

            t.timestamps
        end
    end
end
