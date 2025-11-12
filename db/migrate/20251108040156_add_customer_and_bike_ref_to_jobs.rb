class AddCustomerAndBikeRefToJobs < ActiveRecord::Migration[8.0]
    def change
        add_reference :jobs, :customer, null: false, foreign_key: true
        add_reference :jobs, :bike, null: false, foreign_key: true
    end
end
