class AddDescriptionToImage < ActiveRecord::Migration
  def self.up
    add_column :images, :description, :string
    add_column :images, :size, :string
  end

  def self.down
    remove_column :images, :size
    remove_column :images, :description
  end
end
