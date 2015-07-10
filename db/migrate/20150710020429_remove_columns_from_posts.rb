class RemoveColumnsFromPosts < ActiveRecord::Migration
  def change
    remove_column :posts, :latitude, :string
    remove_column :posts, :longitude, :string
  end
end
