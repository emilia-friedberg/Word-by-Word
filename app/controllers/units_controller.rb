class UnitsController < ApplicationController
  def unit_list
    units = Unit.all.map do |unit|
      {
        name: unit.name,
        lessons: unit.lessons
      }
    end

    units_hash = {
      units: units
    }

    render json: units_hash.to_json
  end

  def lesson_show
    case params[:lesson_id].to_i
    when 1
      render :'unitone/one'
    when 2
      render :'unitone/two'
    when 3
      render :'unitone/three'
    when 4
      render :'unitone/four'
    when 5
      render :'unitone/five'
    end
  end
end
