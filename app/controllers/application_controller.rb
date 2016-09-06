class ApplicationController < ActionController::Base

private
  def after_sign_in_path_for(resource)
    '/teachers/1'
  end

end
