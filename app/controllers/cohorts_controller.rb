class CohortsController < ApplicationController

  def create
    teacher = Teacher.find(params[:teacher][:id])
    cohort = teacher.cohorts.new(name: params[:cohort][:name], access_code: Faker::Code.asin)
    if cohort.save
      cohort.teachers << teacher
      render json: "You have added the #{cohort.name} as a cohort. In order to join a cohort, students must have a registered account and add themselves to the classroom using the provided access code.".to_json
    else
      errors = {errors: cohort.errors.full_messages}
      render json: errors.to_json
    end
  end

  def show
    @cohort = Cohort.find_by_id(params[:id])
    students = @cohort.students
    teachers = @cohort.teachers
    redirect_to(root_url) unless @cohort && (students.include?(current_user) || teachers.include?(current_user))
  end

  def students_info
    cohort = Cohort.find(params[:id])

    if request.xhr?
      students = cohort.students.map do |student|
        {
          id: student.id,
          first_name: student.first_name,
          last_name: student.last_name,
          email: student.email,
          # number_of_completed_assignments: student.completed_assignments_by_cohort(cohort).length,
          number_of_completed_assignments: cohort.total_comp(student),
          number_of_past_due_assignments: student.past_due_assignments_by_cohort(cohort).length
        }
      end

      cohort_hash = {
        cohort: cohort,
        students: students,
      }

      render json: cohort_hash.to_json
    else
      redirect_to '/cohorts/#{cohort.id}'
    end
  end

  def assignments_info
    cohort = Cohort.find(params[:id])

    if request.xhr?
      assignments = cohort.assignments.map do |assignment|
        if assignment.completion_number.nil?
          completion_number = assignment.prompts.length
        else
          completion_number = assignment.completion_number
        end
        {
          id: assignment.id,
          created_at:  assignment.created_at.strftime('%b %e, %Y at %I:%M %p'),
          lesson_id:  assignment.lesson_id,
          lesson_name: assignment.lesson.name,
          unit_id: assignment.lesson.unit.id,
          due_date: assignment.due_date.strftime('%b %e, %Y at %I:%M %p'),
          number_of_prompts: assignment.prompts.length,
          completion_number: completion_number,
          number_of_students_completed: cohort.tally_students_with_completed_assignment(assignment)
        }
      end

      cohort_hash = {
        assignments: assignments
      }

      render json: cohort_hash.to_json
    else
      redirect_to '/cohorts/#{cohort.id}'
    end
  end

  def cohort_info
    cohort = Cohort.find(params[:id])

    if request.xhr?
      cohort_hash = {
        cohort: cohort,
      }

      render json: cohort_hash.to_json
    else
      redirect_to '/cohorts/#{cohort.id}'
    end

  end

end
