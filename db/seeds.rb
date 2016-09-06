# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'faker'
300.times do

  new_s = Student.new(email: Faker::Internet.email,
              password: Faker::Internet.password,
              first_name: Faker::Name.first_name,
              last_name: Faker::Name.last_name,
              display_name: Faker::Superhero.name
                )
  new_s.save
end

puts "students created"

25.times do
  Teacher.create(email: Faker::Internet.email,
              password: Faker::Internet.password,
              first_name: Faker::Name.first_name,
              last_name: Faker::Name.last_name,
              display_name: Faker::Superhero.name)

end

puts "teachers created"

15.times do
  new_cohort = Cohort.create(name: Faker::Team.name, access_code: Faker::Code.asin)
  Teacher.all.sample.cohorts << new_cohort
  Student.all.sample(25).each { |s| s.cohorts << new_cohort }
end

puts "cohorts created"

15.times do
  Child.create(teacher_id: Teacher.all.sample.id, cohort_id: Cohort.all.sample.id, access_code: Faker::Code.asin)
end

puts "child (orphans) created"

Unit.create(name: 'test development unit', description: "this unit is for testing purposes")
5.times do
  Lesson.create(name: Faker::Hacker.ingverb + Faker::Hacker.noun, unit_id: Unit.first.id, common_core_standard: "CC 2.4")
end

puts "units created"

50.times do
  Assignment.create!(cohort_id: Cohort.all.sample.id, lesson_id: Lesson.all.sample.id, due_date: Faker::Date.between(2.days.from_now, 10.days.from_now))
end

puts "assignments created"



require_relative 'sen_seed'

Unit.first.lessons.each do |u_one_lesson|
  real_seeds.each do |seed_sentence|
    lesson_sentence = u_one_lesson.unit_one_sentences.create(content: seed_sentence[:sentence])

    lesson_sentence.unit_one_prompts.create(
      text: 'sample prompt',
      answer_type: 'S',
      answer: seed_sentence[:subjects]
    )
    lesson_sentence.unit_one_prompts.create(
      text: 'sample prompt',
      answer_type: 'V',
      answer: seed_sentence[:verbs]
    )
    lesson_sentence.unit_one_prompts.create(
      text: 'sample prompt',
      answer_type: 'O',
      answer: seed_sentence[:objects]
    )
  end
end



#   when 4
#     #o
#     lesson_sentence.unit_one_prompts.create(
#       text: 'sample prompt',
#       answer_type: 'O',
#       answer: seed_sentence[:objects]
#     )
#   when 5
#     #svo
#     lesson_sentence.unit_one_prompts.create(
#       text: 'sample prompt',
#       answer_type: 'S',
#       answer: seed_sentence[:subjects]
#     )
#     lesson_sentence.unit_one_prompts.create(
#       text: 'sample prompt',
#       answer_type: 'V',
#       answer: seed_sentence[:verbs]
#     )
#     lesson_sentence.unit_one_prompts.create(
#       text: 'sample prompt',
#       answer_type: 'O',
#       answer: seed_sentence[:objects]
#     )
#   end
#
# end


puts "unit one sentences created"

1000.times do
  Attempt.create(correct?: [true, false].sample, prompt_type: 'UnitOneSentence', prompt_id: UnitOneSentence.all.sample.id, scholar_id: Student.all.sample.id, scholar_type: 'Student')

end
