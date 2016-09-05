class CohortsController < ApplicationController

  def create
    teacher = Teacher.find(params[:teacher][:id])
    teacher.cohorts.create(name: params[:cohort][:name], access_code: Faker::Code.asin)
  end

  def show
    @cohort = Cohort.find(params[:id])
  end

  def info
    cohort = Cohort.find(params[:id])
    students = cohort.students.map do |student|
      {
        id: student.id,
        first_name: student.first_name,
        last_name: student.last_name,
        email: student.email,
        number_of_completed_assignments: student.completed_assignments_by_cohort(cohort).length,
        number_of_past_due_assignments: student.past_due_assignments_by_cohort(cohort).length
      }
    end

    assignments = cohort.assignments.map do |assignment|
      if assignment.completion_number.nil?
        completion_number = assignment.prompts.length
      else
        completion_number = assignment.completion_number
      end
      {
        created_at:  assignment.created_at.strftime('%b %e, %Y at %I:%M %p'),
        lesson_id:  assignment.lesson_id,
        lesson_name: assignment.lesson.name,
        unit_id: assignment.lesson.unit.id,
        due_date: assignment.due_date.strftime('%b %e, %Y at %I:%M %p'),
        number_of_prompts: assignment.prompts.length,
        completion_number: completion_number
      }
    end

      cohort_hash = {
        cohort: cohort,
        students: students,
        assignments: assignments
      }

      render json: cohort_hash.to_json

  end

end
