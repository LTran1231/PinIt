class HomeController < ApplicationController
  def index
  end

  def user_data
    render json: current_user
  end

  def posts_data
    user = User.find(params[:id])
    posts = user.posts
    p posts
    render json: posts
  end
end
