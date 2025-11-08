class Job < ApplicationRecord
    belongs_to :customer
    belongs_to :bike
    has_many :notes
end
