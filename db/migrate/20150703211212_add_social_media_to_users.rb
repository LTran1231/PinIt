class AddSocialMediaToUsers < ActiveRecord::Migration
  def change
    add_column :users, :facebook_url, :string
    add_column :users, :google_url, :string
    add_column :users, :instagram, :string
    add_column :users, :twitter, :string
  end
end
