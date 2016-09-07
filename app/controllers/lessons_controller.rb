class LessonsController < ApplicationController

  def show
    lessons = Lesson.all
    lessons_hash = {lessons: lessons}
    render json: lessons_hash.to_json
  end

end
