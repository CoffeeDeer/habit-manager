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

ActiveRecord::Schema[7.1].define(version: 2023_12_15_033531) do
  create_table "habit_types", force: :cascade do |t|
    t.string "title"
    t.integer "repeat_type_id", null: false
    t.string "repeat_value"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["repeat_type_id"], name: "index_habit_types_on_repeat_type_id"
  end

  create_table "habits", force: :cascade do |t|
    t.integer "habit_type_id", null: false
    t.boolean "is_completed"
    t.date "target_date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["habit_type_id"], name: "index_habits_on_habit_type_id"
  end

  create_table "repeat_types", force: :cascade do |t|
    t.string "title"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "todos", force: :cascade do |t|
    t.string "name", null: false
    t.boolean "is_completed", default: false, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "habit_types", "repeat_types"
  add_foreign_key "habits", "habit_types"
end
