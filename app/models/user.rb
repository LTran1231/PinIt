class User < ActiveRecord::Base
  has_many :posts

  before_save { self.email = email.downcase }

  validates :name, presence: true, length: { maximum: 50 }

  # VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i
  # validates :email, format:     { with: VALID_EMAIL_REGEX },
  #                   uniqueness: { case_sensitive: false }
                    
  has_secure_password(validations: false)
  validates :password, length: { minimum: 6 }, allow_blank: true

  def self.create_from_provider(user, provider)
    name = "#{user[:cachedUserProfile][:name]}"
    email = "#{user[:email]}"
    firebase_uid = "#{user[:id]}"
    provider = "#{provider}"
    facebook_url = "#{user[:cachedUserProfile][:link]}"
    avatar = "#{user[:profileImageURL]}"
    existing_user = self.where(uid: firebase_uid).first
    if existing_user
      existing_user.update!(
        name: name, 
        uid: firebase_uid, 
        provider: provider, 
        facebook_url: facebook_url, 
        avatar: avatar 
        )
      return existing_user
    else
      self.create!(
      	name: name, 
      	email: email, 
      	uid: firebase_uid, 
      	provider: provider, 
      	facebook_url: facebook_url, 
      	avatar: avatar 
      	)
    end
  end
end
