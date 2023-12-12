class CreateHabitTypes < ActiveRecord::Migration[7.1]
  def change
    create_table :habit_types do |t|
      t.string :title
      t.references :repeat_type, null: false, foreign_key: true
      t.string :repeat_value

      t.timestamps
    end
  end
end
