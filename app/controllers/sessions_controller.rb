class SessionsController < ApplicationController
  def new
  	render 'new'
  end

  def login_via_social_media
    user = user
    byebug
    session[:user_id] = user.id
    p session
    redirect_to root_path
  end

  def create
  	user = User.find_by(email: params[:session][:email].downcase)
  	if user && user.authenticate(params[:session][:password])
  		session[:user_id] = user.id
      redirect_to user 
  	else
			flash.now[:danger] = 'invalid email/password'
  		render 'new'
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
