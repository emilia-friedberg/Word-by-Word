class AssignmentsController < ApplicationController

  def create
    cohort = Cohort.find_by(name: params[:cohort])
    lesson = Lesson.find_by(name: params[:lesson])
    cohort.assignments.create(lesson_id: lesson.id, due_date: params[:due_date], completion_number: params[:completion_number])
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
