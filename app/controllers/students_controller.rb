class StudentsController < ApplicationController
  def show
    @student = Student.find_by_id(params[:id])
    redirect_to(root_url, :notice => 'Record not found') unless @student
  end

  def info
    student = Student.find(params[:id])

    if student.cohorts.nil?
      student_belongs_to_cohort = false
    else
      student_belongs_to_cohort = true
    end

    cohorts = student.cohorts

    student_hash = {student: student, studentBelongsToCohort: student_belongs_to_cohort, studentCohorts: cohorts}
    render json: student_hash.to_json
  end


  def completed_assignments
    student = Student.find(params[:id])

    completed_assignments = student.completed_assignments.map do |assignment|

      {
        created_at:  assignment.created_at.strftime('%b %e, %Y at %I:%M %p'),
        lesson_id:  assignment.lesson_id,
        lesson_name: assignment.lesson.name,
        cohort_id:  assignment.cohort_id,
        unit_id: assignment.lesson.unit.id,
        due_date: assignment.due_date.strftime('%b %e, %Y at %I:%M %p'),
        score: "#{assignment.score(student)}/#{assignment.prompts.length}"
      }
    end

    student_hash = {completedAssignments: completed_assignments}
    render json: student_hash.to_json

  end

  def past_due_assignments
    student = Student.find(params[:id])

    past_due_assignments = student.past_due_assignments.map do |assignment|
      {
        created_at:  assignment.created_at.strftime('%b %e, %Y at %I:%M %p'),
        lesson_id:  assignment.lesson_id,
        lesson_name: assignment.lesson.name,
        cohort_id:  assignment.cohort_id,
        unit_id: assignment.lesson.unit.id,
        due_date: assignment.due_date.strftime('%b %e, %Y at %I:%M %p')
      }
    end

    student_hash = {pastDueAssignments: past_due_assignments}
    render json: student_hash.to_json

  end

  def pending_assignments
    student = Student.find(params[:id])

    pending_assignments = student.pending_assignments.map do |assignment|
      {
        created_at:  assignment.created_at.strftime('%b %e, %Y at %I:%M %p'),
        lesson_id:  assignment.lesson_id,
        lesson_name: assignment.lesson.name,
        cohort_id:  assignment.cohort_id,
        unit_id: assignment.lesson.unit.id,
        due_date: assignment.due_date.strftime('%b %e, %Y at %I:%M %p')
      }
    end

    student_hash = {pendingAssignments: pending_assignments}
    render json: student_hash.to_json
  end

  def attempted_lessons
    student = Student.find(params[:id])

    attempted_lessons = student.incomplete_practice_lessons.map do |lesson|
      {
        lesson_id: lesson.id,
        lesson_name: lesson.name,
        unit_id: lesson.unit.id
      }
    end

    student_hash = {attemptedLessons: attempted_lessons}
    render json: student_hash.to_json

  end

  def mastered_lessons
    student = Student.find(params[:id])

    mastered_lessons = student.mastered_lessons.map do |lesson|
      {
        lesson_id: lesson.id,
        lesson_name: lesson.name,
        unit_id: lesson.unit.id,
        score: "#{lesson.score(student)}/#{lesson.prompts.length}"
      }
    end

    student_hash = {masteredLessons: mastered_lessons}
    render json: student_hash.to_json

  end


  def assign_cohort
    student = Student.find(params[:id])
    cohort = Cohort.find_by(access_code: params[:cohort][:access_code])
    if cohort
      cohort.students << student if cohort.students.find_by_id(student.id).nil?
      render json: "You have been added as a student to the #{cohort.name}. View any new assignments by clicking on the tabs below.".to_json
    else
      errors = {errors: "Invalid access code"}
      render json: errors.to_json
    end
  end

end
