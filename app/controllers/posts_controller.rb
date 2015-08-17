class PostsController < ApplicationController
  layout "profile"
  before_filter :load_user
  before_action :set_post, only: [:show, :edit, :update, :destroy]
  skip_before_action :verify_authenticity_token

  # GET /location_posts
  def location_posts
    @posts = Post.all
    @posts = @user.posts.all
    render json: @user
  end

  # GET /posts
  # GET /posts.json
  def index
    @posts = Post.all
    @posts = @user.posts.all
  end

  # GET users/1/posts/1
  # GET /posts/1.json
  def show
  end

  # GET users/1/posts/new
  def new
    @post = @user.posts.new
    @post.locations.build
  end

  # GET /posts/1/edit
  def edit

  end

  # POST /posts
  # POST /posts.json
  def create
    @post = @user.posts.create(post_params)
    params[:post][:locations_attributes].each do |location|
      location = Location.where(address: location[1][:address], lat: location[1][:lat], lng: location[1][:lng]).first_or_initialize
      location.save
      @post.pins.new(location_id: location.id).save
    end
    if @post.save
      flash[:notice] = "Post was successfully created."
      redirect_to [@post.user, @post]
    else
      render :new
    end
  end

  # PATCH/PUT /posts/1
  # PATCH/PUT /posts/1.json
  def update
    respond_to do |format|
      if @post.update(post_params)
        format.html { redirect_to [@user, @post], notice: 'Post was successfully updated.' }
        format.json { render :show, status: :ok, location: @post }
      else
        format.html { render :edit }
        format.json { render @post.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /posts/1
  # DELETE /posts/1.json
  def destroy
    @post.destroy
    respond_to do |format|
      format.html { redirect_to user_posts_url(@post.user), notice: 'Post was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    def load_user
      @user = User.find(params[:user_id])
    end
    # Use callbacks to share common setup or constraints between actions.
    def set_post
      @post = @user.posts.find(params[:id])
      @post.locations.each {|location| location }
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def post_params
      params.require(:post).permit( 
        :title, 
        :content, 
        :travel_date, 
        :user_id, 
        locations_attributes: [ :lat, :lng, :address ] 
        )
    end
end


