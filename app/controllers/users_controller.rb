class UsersController < ApplicationController
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
		@user = User.new(user_params)
		if @user.save
			redirect_to @user
		else
			render 'new'
		end
	end

	def edit
		@user = User.find(params[:id])
	end


	def update
		@user = User.find(params[:id])
		p params
		if @user.update_attributes(user_params)
			p "3" *100
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
			:twitter
			)
	end

end


# http_basic_authenticate_with name: 'dhh', password: 'secret',
# except: [:index, :show]
