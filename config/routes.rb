RideJournal::Application.routes.draw do
  resources :rides
  resource :gpsbabel, :only => :create
  root to: 'home#show'
end
