RideJournal::Application.routes.draw do
  resources :rides
  root to: 'home#show'
end
