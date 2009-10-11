class AddPositionToSeries < ActiveRecord::Migration
  def self.up
    add_column :series, :position, :integer
  end

  def self.down
    remove_column :series, :position
  end
end
