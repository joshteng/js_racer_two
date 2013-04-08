class CreateTables < ActiveRecord::Migration
  def change

    create_table(:players) do |t|
      t.string :name
      t.timestamps
    end
      add_index :players, :name, :unique => true

    create_table(:games) do |t|
      t.integer :time_played_in_seconds
      t.integer :winner_id
      t.timestamps
    end
  
    create_table(:games_players) do |t|
      t.integer :game_id
      t.integer :player_id
    end  
    add_index :games_players, [:game_id, :player_id], unique: true
  end
end
