class AddthumbdimensionsToImage < ActiveRecord::Migration
  def self.up
    add_column :images, :width_thumb, :integer
    add_column :images, :height_thumb, :integer
  end

  def self.down
    remove_column :images, :width_thumb
    remove_column :images, :height_thumb
  end
end
