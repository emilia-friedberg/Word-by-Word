class AttemptsController < ApplicationController

  def streak
    if current_user
      prompt_ids = Lesson.find(params[:lesson_id]).sentences.map { |sen| sen.prompts.pluck(:id) }.flatten.sort
      user_attempts = Attempt.where(scholar_id: current_user.id, scholar_type: current_user.type).select do |attempt|
        prompt_ids.include?(attempt.prompt_id)
      end

      total_attempts = user_attempts.length
      total_correct = user_attempts.select { |attempt| attempt.correct? }.length
      streak = 0
      for attempt in user_attempts.reverse
        break unless attempt.correct?
        streak += 1
      end
      # binding.pry
      return render json: {totalAttempts: total_attempts, totalCorrect: total_correct, streak: streak}
    end
  end


end
