class CreateLocations < ActiveRecord::Migration
  def change
    create_table :locations do |t|
      t.float :lat
      t.float :lng
      t.string :city
      t.string :country

      t.timestamps null: false
    end
  end
end
