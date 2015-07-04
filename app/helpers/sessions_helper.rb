module SessionsHelper

	# redirects to the stored location or to the default 
	def redirect_back_or(default)
		redirect_to(session[:forwarding_url] || default)
		session.delete(:forwarding_url)
	end

	# stores the URL that the user is trying to access
	def store_location
		session[:forwarding_url] = request.url if request.get?
	end
end
