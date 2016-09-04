class CohortsController < ApplicationController

  def create
    teacher = Teacher.find(params[:teacher][:id])
    teacher.cohorts.create(name: params[:cohort][:name], access_code: Faker::Code.asin)
  end

end
