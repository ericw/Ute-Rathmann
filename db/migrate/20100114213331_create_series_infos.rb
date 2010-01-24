class CreateSeriesInfos < ActiveRecord::Migration
  def self.up
    create_table :series_infos do |t|
      t.string :title
      t.text :description
      t.integer :series_id
      t.timestamps
    end
  end

  def self.down
    drop_table :series_infos
  end
end
