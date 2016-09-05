class UnitsController < ApplicationController
  def unit_list
    units = Unit.all.map do |unit|
      lessons = unit.lessons.map do |lesson|
          {
            name: lesson.name,
            id: lesson.id
          }
        end
    return  {
      name: unit.name,
      lessons: lessons
      }
    end

    units_hash = {
      units: units
    }
    render json: units_hash.to_json
  end

  def lesson_show
    # this needs to be changed to accomodate the params....
    render :'unitone/three'
  end
end
