class AddSeriesIdToImage < ActiveRecord::Migration
  def self.up
    add_column :images, :series_id, :integer
  end

  def self.down
    remove_column :images, :series_id
  end
end
