class AssignmentsController < ApplicationController

  def create
    cohort = Cohort.find_by(name: params[:cohort])
    lesson = Lesson.find_by(name: params[:lesson])
    cohort.assignments.create(lesson_id: lesson.id, due_date: params[:due_date], completion_number: params[:completion_number])
  end

end
