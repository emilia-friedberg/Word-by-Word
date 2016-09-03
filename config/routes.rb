Rails.application.routes.draw do
  root to: 'application#index'
  # get 'practice/show'

  devise_for :users, controllers: { registrations: 'users/registrations', sessions: 'users/sessions'}
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
     get '/users/sign_in' => 'devise/sessions#create'
     get '/users/sign_up' => 'users/registrations#new'
  get 'students/:id', to: 'students#show'
  get 'teachers/:id', to: 'teachers#show'
  get '/practice/units/:unit_id/lessons/:lesson_id', to: 'practice#show'
  resources :cohorts, :assignments

end
