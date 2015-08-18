class SessionsController < ApplicationController
  skip_before_action :verify_authenticity_token
  
  def new
  	render 'new'
  end

  def login_via_social_media
    user = params[:user]
    provider = params[:provider]
    @user = User.create_from_provider(user, provider)
    session[:user_id] = @user.id
    render json: current_user
  end

  def create
    p params
  	user = User.find_by(email: params[:session][:email].downcase)
  	if user && user.authenticate(params[:session][:password])
  		session[:user_id] = user.id
      redirect_to user 
  	else
			flash.now[:danger] = 'invalid email/password'
  		render "shared/_flash_messages", layout: false
  	end
  end

  def destroy
  	session[:user_id] = nil
  	redirect_to root_path
  end

private
  def sessions_params
		params.require(:user).permit(:email, :password)
	end
end