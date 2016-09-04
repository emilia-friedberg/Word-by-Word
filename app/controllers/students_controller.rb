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
    # attempted_lessons = []
    mastered_lessons = []

    # student.attempts.each do |attempt|
    #   attempted_lessons << attempt.prompt.sentence.lesson
    # end



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


    attempted_lessons = student.incomplete_practice_lessons.map do |lesson|
      {
        lesson_id: lesson.id,
        lesson_name: lesson.name,
        unit_id: lesson.unit.id
      }
    end

    mastered_lessons = student.mastered_lessons.map do |lesson|
      {
        lesson_id: lesson.id,
        lesson_name: lesson.name,
        unit_id: lesson.unit.id,
        score: "#{lesson.score(student)}/#{lesson.prompts.length}"
      }
    end

    student_hash = {student: student, studentBelongsToCohort: student_belongs_to_cohort, studentCohorts: cohorts, pendingAssignments: pending_assignments, pastDueAssignments: past_due_assignments, completedAssignments: completed_assignments, attemptedLessons: attempted_lessons, masteredLessons: mastered_lessons}
    render json: student_hash.to_json
  end

  def assign_cohort
    student = Student.find(params[:id])
    cohort = Cohort.find_by(access_code: params[:cohort][:access_code])
    cohort.students << student if cohort.students.find_by_id(student.id).nil?
  end

end
