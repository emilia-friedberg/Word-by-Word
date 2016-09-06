class TeachersController < ApplicationController
  def show
    @teacher = Teacher.find_by_id(params[:id])
    # redirect_to(root_url, :notice => 'Record not found') unless @teacher
  end

  def info
    teacher = Teacher.find(params[:id])

    if teacher.cohorts.nil?
      teacher_has_cohorts = false
    else
      teacher_has_cohorts = true
    end

  cohorts = teacher.cohorts.map do |cohort|
    {
      id: cohort.id,
      name: cohort.name,
      access_code: cohort.access_code,
      size: cohort.students.length,
      number_of_students_with_overdue_assignments: cohort.tally_students_with_overdue_assignments
    }
  end

    teacher_hash = {
      teacher: teacher,
      teacherHasCohorts: teacher_has_cohorts,
      teacherCohorts: cohorts,
      lessons: Lesson.all
    }

    render json: teacher_hash.to_json

  end

  def assign_cohort
    teacher = Teacher.find(params[:id])
    cohort = Cohort.find_by(access_code: params[:cohort][:access_code])
    cohort.teachers << teacher if cohort.teachers.find_by_id(teacher.id).nil?
  end

end
