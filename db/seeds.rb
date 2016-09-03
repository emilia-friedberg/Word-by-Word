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

15.times do
  new_cohort = Cohort.create(name: Faker::Team.name, access_code: Faker::Code.asin)
  Teacher.all.sample.cohorts << new_cohort
  Student.all.sample(25).each { |s| s.cohorts << new_cohort }
end

15.times do
  Child.create(teacher_id: Teacher.all.sample.id, cohort_id: Cohort.all.sample.id, access_code: Faker::Code.asin)
end

Unit.create(name: 'test development unit', description: "this unit is for testing purposes")
5.times do
  Lesson.create(name: Faker::Hacker.ingverb + Faker::Hacker.noun, unit_id: Unit.first.id, common_core_standard: "CC 2.4")
end

50.times do
  Assignment.create!(cohort_id: Cohort.all.sample.id, lesson_id: Lesson.all.sample.id, due_date: Faker::Date.between(2.days.from_now, 10.days.from_now))
end

30.times do
  UnitOneSentence.create(content: Faker::Hipster.sentence(3), lesson_id: Lesson.all.sample.id)
end

UnitOneSentence.all.each do |s|
  3.times do
    hip_sen = Faker::Hipster.sentence(3)
    UnitOnePrompt.create(unit_one_sentence_id: s.id, text: hip_sen, answer_type: ['S','V', 'O'].sample, answer: hip_sen.split.sample)
  end
end

1000.times do
  Attempt.create(correct?: [true, false].sample, prompt_type: 'UnitOneSentence', prompt_id: UnitOneSentence.all.sample.id, scholar_id: Student.all.sample.id, scholar_type: 'Student')

end
