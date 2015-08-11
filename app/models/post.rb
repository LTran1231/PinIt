class Post < ActiveRecord::Base
  belongs_to :user
  has_many :locations, through: :pins
  has_many :pins

  accepts_nested_attributes_for :locations, allow_destroy: true, reject_if: lambda {|attributes| attributes['kind'].blank?}
end
