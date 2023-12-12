class CreateHabits < ActiveRecord::Migration[7.1]
  def change
    create_table :habits do |t|
      t.references :habit_type, null: false, foreign_key: true
      t.boolean :is_completed
      t.date :target_date

      t.timestamps
    end
  end
end
