class Location < ActiveRecord::Base
	has_many :posts, through: :pins
	has_many :pins
end
