class LocationsController < ApplicationController
	skip_before_action :verify_authenticity_token
	
	def save_location
		puts "hello"
	end
end
