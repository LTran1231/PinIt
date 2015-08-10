class Post < ActiveRecord::Base
  belongs_to :user
  has_many :locations, through: :pins
  has_many :pins
end
