class Student < User
  has_many :attempts
  has_many :cohort_students
  has_many :cohorts, through: :cohort_students
  has_many :teachers, through: :cohorts
  has_many :assignments, through: :cohorts

  def attempts
    Attempt.where(scholar_id: id, scholar_type: 'Student')
  end

  def assignments
    assignments = []
    self.cohorts.each do |cohort|
      cohort.assignments.each do |assignment|
        assignments << assignment
      end
    end
    assignments
  end

  def has_overdue_assignment?(cohort)
    cohort.assignments.each do |assignment|
      return true if !assignment.completed?(self) && assignment.overdue?
    end
    return false
  end

  def assigned_lessons
    assigned_lessons = []
    self.cohorts.each do |cohort|
      cohort.assignments.each do |assignment|
        assigned_lessons << assignment.lesson
      end
    end
    assigned_lessons
  end

  def completed_assignments
    completed_assignments = []
    self.cohorts.each do |cohort|
      cohort.assignments.each do |assignment|
        completed_assignments << assignment if assignment.completed?(self)
      end
    end
    completed_assignments
  end

  def past_due_assignments
    past_due_assignments = []
    self.cohorts.each do |cohort|
      cohort.assignments.each do |assignment|
        past_due_assignments << assignment if assignment.overdue? && !assignment.completed?(self)
      end
    end
    past_due_assignments
  end

  def pending_assignments
    pending_assignments = []
    self.cohorts.each do |cohort|
      cohort.assignments.each do |assignment|
        pending_assignments << assignment if !assignment.overdue? && !assignment.completed?(self)
      end
    end
    pending_assignments
  end

  def attempted_lessons
    self.attempts.map { |attempt| attempt.prompt.sentence.lesson }.uniq
  end

  def mastered_lessons
    self.attempted_lessons.select { |lesson| lesson.mastered?(self) }.uniq
  end

  def incomplete_practice_lessons
    self.attempted_lessons.uniq - self.assigned_lessons - self.mastered_lessons
  end

end
