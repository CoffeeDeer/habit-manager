class CreateRepeatTypes < ActiveRecord::Migration[7.1]
  def change
    create_table :repeat_types do |t|
      t.string :title

      t.timestamps
    end
  end
end
