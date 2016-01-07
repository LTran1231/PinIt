class HomeController < ApplicationController
  def index

  end

  def search

    # locations = params["/search"]["Geolocation"].split
    p params
    # location = locations.map { |location| "address like '%#{location}%'" }.join(" OR ")

    # byebug
  end

  def post_data
    title = Post.find(params[:postID]).title
    authorName = Post.find(params[:postID]).user.name
    userID = Post.find(params[:postID]).user.id
    travelDate = Post.find(params[:postID]).travel_date
    content = Post.find(params[:postID]).content
    byebug
    

    render json: { title: title, authorName: authorName, userID: userID, content: description, travelDate: travelDate }
  end

  def pins
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
