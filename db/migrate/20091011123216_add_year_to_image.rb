class AddYearToImage < ActiveRecord::Migration
  def self.up
    add_column :images, :year, :integer
  end

  def self.down
    remove_column :images, :year
  end
end
