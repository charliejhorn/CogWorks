# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

require "date"

ActiveRecord::Base.transaction do
    # Create roles
    mechanic_role = Role.find_or_create_by!(name: "mechanic", description: "a staff member who's a mechanic")
    admin_role = Role.find_or_create_by!(name: "admin", description: "an administrator")

    # Create users
    mechanic1 = User.create!(email: "mechanic1@gmail.com", password_hash: "bcrypt::1234")
    mechanic1.roles << mechanic_role

    mechanic2 = User.create!(email: "mechanic2@gmail.com", password_hash: "bcrypt::5678")
    mechanic2.roles << mechanic_role

    admin = User.create!(email: "admin@gmail.com", password_hash: "bcrypt::9999")
    admin.roles << admin_role

    # Create customers
    customers = [
        { name: "Hannah", email: "hannah@gmail.com", phone: "04123456789" },
        { name: "John", email: "john@gmail.com", phone: "04123456790" },
        { name: "Mary", email: "mary@gmail.com", phone: "04123456791" },
        { name: "Bob", email: "bob@gmail.com", phone: "04123456792" },
        { name: "Alice", email: "alice@gmail.com", phone: "04123456793" }
    ]

    created_customers = customers.map { |c| Customer.create!(c) }

    # Assign bikes and jobs
    # Hannah: 1 bike, 1 job
    hannah = created_customers[0]
    norco = hannah.bikes.create!(description: "blue norco")
    job1 = norco.jobs.create!(customer: hannah, due_date: DateTime.now, cost: 50, status: "open")

    # John: 2 bikes, 2 jobs
    john = created_customers[1]
    trek = john.bikes.create!(description: "red trek")
    giant = john.bikes.create!(description: "green giant")
    job2 = trek.jobs.create!(customer: john, due_date: DateTime.now + 1.day, cost: 100, status: "in_progress")
    job3 = giant.jobs.create!(customer: john, due_date: DateTime.now + 2.days, cost: 75, status: "completed")

    # Mary: 1 bike, 1 job
    mary = created_customers[2]
    specialized = mary.bikes.create!(description: "black specialized")
    job4 = specialized.jobs.create!(customer: mary, due_date: DateTime.now + 3.days, cost: 200, status: "open")

    # Bob: 3 bikes, 1 job
    bob = created_customers[3]
    cannondale1 = bob.bikes.create!(description: "yellow cannondale")
    bob.bikes.create!(description: "blue cannondale")
    bob.bikes.create!(description: "red cannondale")
    job5 = cannondale1.jobs.create!(customer: bob, due_date: DateTime.now + 4.days, cost: 150, status: "pending")

    # Alice: 1 bike, 2 jobs
    alice = created_customers[4]
    santa_cruz = alice.bikes.create!(description: "orange santa cruz")
    santa_cruz.jobs.create!(customer: alice, due_date: DateTime.now + 5.days, cost: 80, status: "open")
    santa_cruz.jobs.create!(customer: alice, due_date: DateTime.now + 6.days, cost: 60, status: "in_progress")

    # Create notes
    # Job1: 2 notes (mechanic1 and mechanic2)
    mechanic1.notes.create!(job: job1, text: "Initial inspection completed")
    mechanic2.notes.create!(job: job1, text: "Needs brake adjustment")

    # Job2: 1 note (mechanic1)
    mechanic1.notes.create!(job: job2, text: "Chain replaced")

    # Job3: 1 note (admin)
    admin.notes.create!(job: job3, text: "Job completed successfully")

    # Job4: 1 note (mechanic2)
    mechanic2.notes.create!(job: job4, text: "Tire puncture fixed")

    # Job5: 0 notes

    # Additional notes for users to have multiples
    # Mechanic1 has 3 notes total (already 2, add 1 more)
    mechanic1.notes.create!(job: job4, text: "Additional note by mechanic1")

  # Mechanic2 has 2 notes (already 2)
  # Admin has 1 note
end
