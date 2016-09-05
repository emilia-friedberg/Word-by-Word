Rails.application.routes.draw do

  get 'practice/show'

  devise_for :users, controllers: { registrations: 'users/registrations'}
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get 'students/:id', to: 'students#show'
  get 'teachers/:id', to: 'teachers#show'
  get '/practice/units/:unit_id/lessons/:lesson_id', to: 'practice#show'
  resources :cohorts
  resources :assignments
  root to: 'application#index'

  get '/practice/UnitOne/Lesson1', to: 'unitone#one'
  get '/practice/UnitOne/Lesson2', to: 'unitone#two'
  get '/practice/UnitOne/Lesson3', to: 'unitone#three'
  get '/practice/UnitOne/Lesson4', to: 'unitone#four'
  get '/practice/UnitOne/Lesson5', to: 'unitone#five'

  get '/UnitOneSentence', to: 'unitone#unitonesentence'
  post '/UnitOne/Attempts', to: 'unitone#attempts'
end
