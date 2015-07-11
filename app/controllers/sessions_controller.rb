class SessionsController < ApplicationController
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
def create
    @post = Post.new(post_params)

    respond_to do |format|
      if @post.save
        format.html { redirect_to @post, notice: 'Post was successfully created.' }
        format.json { render :show, status: :created, location: @post }
      else
        format.html { render :new }
        format.json { render json: @post.errors, status: :unprocessable_entity }
      end
    end
  end