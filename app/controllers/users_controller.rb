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

	def edit
# 		@article = Article.find(params[:id])
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

	def update
# 		@article = Article.find(params[:id])

# 		if @article.update(article_params)
# 			redirect_to @article
# 		else
# 			render 'edit'
# 		end
	end

	def destroy
# 		@article = Article.find(params[:id])
# 		@article.destroy

# 		redirect_to articles_path
	end

private
	def user_params
		params.require(:user).permit(:name, :email, :password)
	end

end



# http_basic_authenticate_with name: 'dhh', password: 'secret',
# except: [:index, :show]
