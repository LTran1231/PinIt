class HomeController < ApplicationController
  def index

  end

  def post_data
    title = Post.find(params[:postID]).title
    authorName = Post.find(params[:postID]).user.name
    userID = Post.find(params[:postID]).user.id
    travelDate = Post.find(params[:postID]).travel_date
    content = Post.find(params[:postID]).content
    # if content.split(" ").length > 20
    #   description = content.split(" ").first(20).join(' ')
    # else
    #   description = content
    # end 
    render json: { title: title, authorName: authorName, userID: userID, content: content, travelDate: travelDate }
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
