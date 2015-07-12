class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.string :title
      t.text :content
      t.date :travel_date
      t.string :location
      t.float :lat
      t.float :lng
      t.references :user, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
