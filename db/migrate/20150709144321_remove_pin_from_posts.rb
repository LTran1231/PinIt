class RemovePinFromPosts < ActiveRecord::Migration
  def change
    remove_reference :posts, :pin, index: true, foreign_key: true
  end
end
