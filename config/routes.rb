Rails.application.routes.draw do

  get 'practice/show'

  devise_for :users, controllers: { registrations: 'users/registrations'}
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get 'students/:id/info', to: 'students#info'
  post 'students/:id/info', to: 'students#assign_cohort'
  get 'students/:id', to: 'students#show'
  get 'teachers/:id', to: 'teachers#show'
  get '/practice/units/:unit_id/lessons/:lesson_id', to: 'practice#show'
  resources :cohorts
  resources :assignments
  root to: 'application#index'
end
