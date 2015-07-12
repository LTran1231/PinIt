class HomeController < ApplicationController
  def index
  end

  def user_data
    render json: current_user
  end

  def posts_data
    posts = Post.all
    render json: posts
  end
end
