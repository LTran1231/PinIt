# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150915204050) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "clearance_batches", force: :cascade do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "status"
  end

  create_table "items", force: :cascade do |t|
    t.string   "size"
    t.string   "color"
    t.string   "status"
    t.decimal  "price_sold"
    t.datetime "sold_at"
    t.integer  "style_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "clearance_batch_id"
  end

  add_index "items", ["clearance_batch_id"], name: "index_items_on_clearance_batch_id", using: :btree

  create_table "locations", force: :cascade do |t|
    t.float    "lat"
    t.float    "lng"
    t.string   "address"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "pins", force: :cascade do |t|
    t.integer  "post_id"
    t.integer  "location_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "pins", ["location_id"], name: "index_pins_on_location_id", using: :btree
  add_index "pins", ["post_id"], name: "index_pins_on_post_id", using: :btree

  create_table "posts", force: :cascade do |t|
    t.string   "title"
    t.text     "content"
    t.date     "travel_date"
    t.integer  "user_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "posts", ["user_id"], name: "index_posts_on_user_id", using: :btree

  create_table "styles", force: :cascade do |t|
    t.decimal  "wholesale_price"
    t.decimal  "retail_price"
    t.string   "type"
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: :cascade do |t|
    t.string   "name"
    t.string   "email"
    t.string   "password_digest"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.string   "facebook_url"
    t.string   "google_url"
    t.string   "instagram"
    t.string   "twitter"
    t.string   "avatar"
    t.string   "provider"
    t.string   "uid"
  end

  add_foreign_key "pins", "locations"
  add_foreign_key "pins", "posts"
  add_foreign_key "posts", "users"
end
