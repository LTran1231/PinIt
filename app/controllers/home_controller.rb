class HomeController < ApplicationController
  def index
  end

  def user_data
    render json: current_user
  end

  def posts_data
    pins = Pin.all
    pinData = []
    pins.each do |pin|
      postId = pin.post_id
      coords = [pin.location.lat, pin.location.lng]
      pinData << { "#{postId}" => {coords: coords} }
    end

    render json: pinData
  end
end
