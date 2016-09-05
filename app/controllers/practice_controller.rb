class PracticeController < ApplicationController
  def show
  end

  def unitoneword
    sentence = Unit.first.lessons.find(3).sentences.sample
    prompts = sentence.unit_one_prompts


    if prompts.find_by(answer_type: 'S')
      subjects = prompts.find_by(answer_type: 'S').answer.scan(/\w+/)
    else
      subjects = []
    end

    if prompts.find_by(answer_type: 'V')
      verbs = prompts.find_by(answer_type: 'V').answer.scan(/\w+/)
    else verbs = []
    end

    # binding.pry
    return render json: {sentence: sentence.content.split, subjects: subjects, verbs: verbs}
  end

end
