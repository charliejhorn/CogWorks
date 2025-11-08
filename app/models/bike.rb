class Bike < ApplicationRecord
    has_many :jobs
    belongs_to :customer
end
