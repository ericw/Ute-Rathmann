class AddVisibleToSeries < ActiveRecord::Migration
  def self.up
    add_column :series, :visible, :boolean
  end

  def self.down
    remove_column :series, :visible
  end
end
