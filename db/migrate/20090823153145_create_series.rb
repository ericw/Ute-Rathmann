class CreateSeries < ActiveRecord::Migration
  def self.up
    create_table :series do |t|
      t.string :title

      t.timestamps
    end
  end

  def self.down
    drop_table :series
  end
end
