module UsersHelper

 def self.create_from_provider(user, provider)

    if provider == "facebook"
      facebook_url = "#{user[:id]}"
    elsif provider == "google"
      google_url = "#{user[:id]}"
    end

    avatar = "#{user[:profileImageURL]}"
    provider = "#{provider}"
    name = "#{user[:cachedUserProfile][:name]}"
    email ||= "#{user[:email]}" 
    firebase_uid = "#{user[:id]}"
    password = SecureRandom.urlsafe_base64(n=6) 
    password_confirmation = password

    existing_user = User.where(uid: firebase_uid).first

    if existing_user
      existing_user.update!(
        name: name, 
        uid: firebase_uid,
        email: email, 
        provider: provider, 
        facebook_url: facebook_url, 
        google_url: google_url,
        avatar: avatar,
        password: password,
        password_confirmation: password_confirmation
        )
      return existing_user
    else
      User.create!(
      name: name, 
      uid: firebase_uid, 
      provider: provider, 
      email: email,
      facebook_url: facebook_url, 
      google_url: google_url,
      avatar: avatar,
      password: password,
      password_confirmation: password_confirmation 
      )
    end
  end

  def update_user(existing_user)
    existing_user.update!(
    name: name, 
    uid: firebase_uid, 
    provider: provider, 
    facebook_url: facebook_url, 
    google_url: google_url,
    avatar: avatar,
    )
  end
	
end
