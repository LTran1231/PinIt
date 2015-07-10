class AddLogAndLatToPost < ActiveRecord::Migration
  def change
    add_column :posts, :lat, :float
    add_column :posts, :log, :float
  end
end
