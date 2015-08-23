Rails.application.routes.draw do

  get 'home/index'
  post 'search' => 'home#search'

  get 'signup' => 'users#new'
  get 'login'  => 'sessions#new'
  post 'login_via_social_media' => 'sessions#login_via_social_media'
  post 'login' => 'sessions#create'
  delete 'logout' => 'sessions#destroy'

  get 'user_data' => 'home#user_data'

  get 'posts_data' => 'home#posts_data'

  post 'save_location' => 'locations#save_location'






  resources :users do
    resources :posts
    get 'location_posts' => 'posts#location_posts'
  end

  root 'home#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
