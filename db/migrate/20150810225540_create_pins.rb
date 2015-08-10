class CreatePins < ActiveRecord::Migration
  def change
    create_table :pins do |t|
      t.belongs_to :post, index: true, foreign_key: true
      t.belongs_to :location, index: true, foreign_key: true

      t.timestamps null: false
    end
  end
end
