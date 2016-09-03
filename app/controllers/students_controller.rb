class StudentsController < ApplicationController
  def show
    @student = Student.find(params[:id])
  end

  def info
      student = Student.find(params[:id])

      if student.cohorts.nil?
        student_belongs_to_cohort = false
      else
        student_belongs_to_cohort = true
      end

      cohorts = student.cohorts
      pending_assignments = []
      past_due_assignments = []
      completed_assignments = []

      # cohorts.each do |cohort|
      #   cohort.assignments.each do |assignment|
      #     attempted_prompts = []
      #     assignment.prompts.each do |prompt|
      #       attempted_prompts << prompt if !student.attempts.where(prompt_id: prompt.id).empty?
      #     end
      #     if attempted_prompts.length === assignment.prompts.length
      #       completed_assignments << assignment
      #     end
      #   end
      # end


      cohorts.each do |cohort|
        cohort.assignments.each do |assignment|
          if assignment.completed?(student)
            completed_assignments << assignment
          else
            if assignment.overdue?
              past_due_assignments << assignment
            else
              pending_assignments << assignment
            end
          end
        end
      end

      completed_assignments = completed_assignments.map do |assignment|

        {
          created_at:  assignment.created_at.strftime('%b %e, %Y at %I:%M %p'),
          lesson_id:  assignment.lesson_id,
          cohort_id:  assignment.cohort_id,
          unit_id: assignment.lesson.unit.id,
          due_date: assignment.due_date.strftime('%b %e, %Y at %I:%M %p'),
          score: "#{assignment.score(student)}/#{assignment.prompts.length}"
        }
      end


      past_due_assignments = past_due_assignments.map do |assignment|
        {
          created_at:  assignment.created_at.strftime('%b %e, %Y at %I:%M %p'),
          lesson_id:  assignment.lesson_id,
          cohort_id:  assignment.cohort_id,
          unit_id: assignment.lesson.unit.id,
          due_date: assignment.due_date.strftime('%b %e, %Y at %I:%M %p')
        }
      end

      pending_assignments = pending_assignments.map do |assignment|
        {
          created_at:  assignment.created_at.strftime('%b %e, %Y at %I:%M %p'),
          lesson_id:  assignment.lesson_id,
          cohort_id:  assignment.cohort_id,
          unit_id: assignment.lesson.unit.id,
          due_date: assignment.due_date.strftime('%b %e, %Y at %I:%M %p')
        }
      end

      student_hash = {student: student, studentBelongsToCohort: student_belongs_to_cohort, studentCohorts: cohorts, pendingAssignments: pending_assignments, pastDueAssignments: past_due_assignments, completedAssignments: completed_assignments}
      render json: student_hash.to_json
  end
end
