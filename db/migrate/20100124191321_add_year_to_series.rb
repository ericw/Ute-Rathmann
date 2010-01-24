class AddYearToSeries < ActiveRecord::Migration
  def self.up
    add_column :series, :year, :string
  end

  def self.down
    remove_column :series, :year
  end
end
