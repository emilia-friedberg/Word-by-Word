class AssignmentsController < ApplicationController

  def create
    cohort = Cohort.find_by(name: params[:cohort])
    lesson = Lesson.find_by(name: params[:lesson])
    if params[:due_date].empty? || params[:due_time].empty?
      errors = {errors: "Due date and time must be entered in valid format (ex: 01/01/2017 12:00 AM)."}
      render json: errors.to_json
    else
      due_date = DateTime.parse(params[:due_date] + ' ' + params[:due_time])
      assignment = cohort.assignments.new(lesson_id: lesson.id, due_date: due_date, completion_number: params[:completion_number])
      if assignment.save
        render json: "Your assignment has been saved.".to_json
      else
        errors = {errors: assignment.errors.full_messages}
        render json: errors.to_json
      end
    end
  end

  def destroy
    assignment = Assignment.find(params[:id])
    assignment.destroy
  end

  def update
    # due_date = DateTime.parse(params[:due_date])
    assignment = Assignment.find(params[:id])
    assignment.update(due_date: params[:due_date], completion_number: params[:completion_number])
  end

end
