class Customer < ApplicationRecord
    has_many :jobs
    has_many :bikes
end
