class AddCustomerRefToBikes < ActiveRecord::Migration[8.0]
    def change
        add_reference :bikes, :customer, null: false, foreign_key: true
    end
end
