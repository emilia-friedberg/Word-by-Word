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

  get '/units/:unit_id/lessons/:lesson_id', to: "units#lesson_show"

  get '/UnitOneSentence', to: 'unitone#unitonesentence'
  post '/UnitOne/Attempts', to: 'unitone#attempts'

  get 'units/unit_list', to: 'units#unit_list'

end
