class ApplicationController < ActionController::Base

private
  def after_sign_in_path_for(resource)
    '/practice/UnitOne/Lesson1'
  end

end
