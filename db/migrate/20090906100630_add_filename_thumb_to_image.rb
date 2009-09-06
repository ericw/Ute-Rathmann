class AddFilenameThumbToImage < ActiveRecord::Migration
  def self.up
    add_column :images, :filename_thumb, :string
  end

  def self.down
    remove_column :images, :filename_thumb
  end
end
