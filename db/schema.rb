# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_11_08_042244) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "bikes", force: :cascade do |t|
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "customer_id", null: false
    t.index ["customer_id"], name: "index_bikes_on_customer_id"
  end

  create_table "customers", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "phone"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "jobs", force: :cascade do |t|
    t.datetime "due_date"
    t.float "cost"
    t.string "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "customer_id", null: false
    t.bigint "bike_id", null: false
    t.index ["bike_id"], name: "index_jobs_on_bike_id"
    t.index ["customer_id"], name: "index_jobs_on_customer_id"
  end

  create_table "notes", force: :cascade do |t|
    t.string "text"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.bigint "job_id", null: false
    t.index ["job_id"], name: "index_notes_on_job_id"
    t.index ["user_id"], name: "index_notes_on_user_id"
  end

  create_table "roles", force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "roles_users", id: false, force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "role_id", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "email"
    t.string "password_hash"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "bikes", "customers"
  add_foreign_key "jobs", "bikes"
  add_foreign_key "jobs", "customers"
  add_foreign_key "notes", "jobs"
  add_foreign_key "notes", "users"
end
