require 'faker'

25.times do
  Student.create(
                  email: Faker::Internet.email,
                  password: Faker::Internet.password,
                  first_name: Faker::Name.first_name,
                  last_name: Faker::Name.last_name,
                  display_name: Faker::Superhero.name
                )
end

puts "students created"

Teacher.create(
                email: 'mahan.gabe@gmail.com',
                password: 'bella234',
                first_name: 'Gabriel',
                last_name: 'Mahan',
                display_name: 'Mr. Mahan'
              )
Teacher.create(
                email: 'emiliafriedberg@gmail.com',
                password: 'IloveMyra',
                first_name: 'Emilia',
                last_name: 'Friedberg',
                display_name: 'Ms. Friedberg'
              )
puts "teachers created"

new_cohort = Cohort.create(name: "Ms. Friedberg and Mr. Mahan's class", access_code: 'nextGen')
Teacher.all.each {|teacher| teacher.cohorts << new_cohort }
Student.all.each { |student| student.cohorts << new_cohort }
puts "cohorts created"


5.times do
  Child.create(teacher_id: Teacher.all.sample.id, cohort_id: Cohort.all.sample.id, access_code: 'nextGen')
end
puts "child (orphans) created"

Unit.create(name: 'Fundamentals: Subjects, Verbs, and Objects', description: "This unit covers basic identification of subjects, verbs, and objects")
Lesson.create(name: "Subject Identification", unit_id: Unit.first.id, common_core_standard: "CCSS.ELA-LITERACY.L.3.1.A")
Lesson.create(name: "Verb Identification", unit_id: Unit.first.id, common_core_standard: "CCSS.ELA-LITERACY.L.3.1.A")
Lesson.create(name: "Subject and Verb Identification", unit_id: Unit.first.id, common_core_standard: "CCSS.ELA-LITERACY.L.3.1.A")
Lesson.create(name: "Object Identification", unit_id: Unit.first.id, common_core_standard: "CCSS.ELA-LITERACY.L.3.1.A")
Lesson.create(name: "Subject, Verb, and Object Identification", unit_id: Unit.first.id, common_core_standard: "CCSS.ELA-LITERACY.L.3.1.A")

puts "units created"

10.times do
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
puts "unit one sentences created"

unit_prompt_ids = UnitOnePrompt.all.map { |p| p.id }
student_ids = Student.all.map { |s| s.id }

1000.times do
  Attempt.create(correct?: [true, false].sample, prompt_type: 'UnitOneSentence', prompt_id: unit_prompt_ids.sample, scholar_id: student_ids.sample, scholar_type: 'Student')
end

puts "attempts created"
