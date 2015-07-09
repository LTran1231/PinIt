class CreatePins < ActiveRecord::Migration
  def change
    create_table :pins do |t|
      t.string :location

      t.timestamps null: false
    end
  end
end
