class StudentsController < ApplicationController
  def show
    student = Student.find(params[:id])
    if student.cohorts.nil?
      student_belongs_to_cohort = false
    else
      student_belongs_to_cohort = true
    end
    cohorts = student.cohorts
    student_hash = {student: student, studentBelongsToCohort: student_belongs_to_cohort, studentCohorts: cohort}
    render json: student_hash.to_json
  end
end
