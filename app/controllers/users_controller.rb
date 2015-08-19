class UsersController < ApplicationController
	layout "profile", except: [:new, :create, :show]

	def index
# 		@articles = Article.all		
	end

	def show
		@user = User.find(params[:id])
	end

	# SIGNUP
	def new
		@user = User.new
	end


	# CREATE A NEW USER
	def create
		p params
		@user = User.new(user_params)
		p @user
		if @user.save
  		session[:user_id] = @user.id
			render @user
		else
			render json: @user.errors.full_messages, status: 401, layout: false
		end
	end

	def edit
		@user = User.find(params[:id])
	end


	def update
		@user = User.find(params[:id])
		if @user.update_attributes(user_params)
			redirect_to @user
		else
			render 'edit'
		end
	end

	def destroy
# 		@article = Article.find(params[:id])
# 		@article.destroy

# 		redirect_to articles_path
	end

private
	def user_params
		params.require(:user).permit(
			:avatar, 
			:name, 
			:email, 
			:facebook_url, 
			:google_url, 
			:instagram, 
			:twitter,
			:password,
			:password_confirmation
			)
	end

end
