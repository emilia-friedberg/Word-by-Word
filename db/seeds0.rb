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
              display_name: Faker::Superhero.name,
              status: ['Teacher', 'Student'].sample)
  new_s.save
  puts new_s.errors.full_messages.join("\n")
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

20.times do


end
