Rails.application.routes.draw do

  get 'practice/show'

  devise_for :users, controllers: { registrations: 'users/registrations'}
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get 'students/:id/info', to: 'students#info'
  post 'students/:id/cohorts', to: 'students#assign_cohort'
  get 'students/:id', to: 'students#show'
  get 'teachers/:id/info', to: 'teachers#info'
  get 'teachers/:id', to: 'teachers#show'
  post 'teachers/:id/cohorts', to: 'teachers#assign_cohort'
  get 'practice/units/:unit_id/lessons/:lesson_id', to: 'practice#show'
  get 'cohorts/:id/cohort_info', to: 'cohorts#cohort_info'
  get 'cohorts/:id/students_info', to: 'cohorts#students_info'
  get 'cohorts/:id/assignments_info', to: 'cohorts#assignments_info'
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
