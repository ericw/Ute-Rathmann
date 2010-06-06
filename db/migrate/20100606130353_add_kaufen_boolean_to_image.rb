class AddKaufenBooleanToImage < ActiveRecord::Migration
  def self.up
    add_column :images, :kaufen, :boolean, :default => 1
  end

  def self.down
    remove_column :images, :kaufen
  end
end
