class User < ActiveRecord::Base
  before_save { self.email = email.downcase }

  validates :name, presence: true, length: { maximum: 50 }

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i
  validates :email, presence:   true,
                    format:     { with: VALID_EMAIL_REGEX },
                    uniqueness: { case_sensitive: false }
                    
  has_secure_password
  validates :password, length: { minimum: 6 }, allow_nil: true

  def self.create_from_provider(user)
    name = "#{user["name"]}"
    email = "#{user["email"]}"
    password = "#{user["password"]}"
    existing_user = self.where(email: email).first
    if existing_user
      existing_user
    else
      self.create(name: name, email: email, password: password)
    end
  end
end
