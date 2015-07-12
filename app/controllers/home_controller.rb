class HomeController < ApplicationController
  def index
  end

  def user_data
    render json: current_user
  end

  def posts_data
    posts = Post.all
    coords = []
    posts.each do |post|
    	coords << [post.lat, post.log]
    end

    # coords = coords.flatten


    render json: coords
  end
end
