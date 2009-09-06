class Image < ActiveRecord::Base
  belongs_to :series
  acts_as_list :scope => :series

  validates_presence_of   :title, :description, :size
  validates_numericality_of :width, :height, :width_thumb, :height_thumb

  before_destroy  :delete_images
  
  def public_path
    "/images/full/#{filename}"
  end

  def public_thumb_path
    "/images/thumbs/#{filename_thumb}"
  end
  
  # save the full size image
  def full_size_image=(uploaded_file)
    name =  uploaded_file.original_filename
    self.filename = name
    directory = "public/images/full"
    # create the file path
    path = File.join(directory, name)

    raise RuntimeError, "Full size file exists" if File.exist?(path)
    # write the file
    File.open(path, "wb") { |f| f.write(uploaded_file.read) }
  end

  # save the full size image
  def thumb_size_image=(uploaded_file)
    name =  uploaded_file.original_filename
    self.filename_thumb = name
    directory = "public/images/thumbs"
    # create the file path
    path = File.join(directory, name)

    raise RuntimeError, "Thumb size file exists" if File.exist?(path)
    # write the file
    File.open(path, "wb") { |f| f.write(uploaded_file.read) }
  end

  def delete_images
    File.delete("#{RAILS_ROOT}/public/images/full/#{@filename}") if File.exist?("#{RAILS_ROOT}/public/images/full/#{@filename}")
    File.delete("#{RAILS_ROOT}/public/images/thumbs/#{@filename_thumb}") if File.exist?("#{RAILS_ROOT}/public/images/thumbs/#{@filename_thumb}")
  end
  
  def sanitize_filename(file_name)
    # get only the filename, not the whole path (from IE)
    just_filename = File.basename(file_name) 
    # replace all none alphanumeric, underscore or perioids
    # with underscore
    just_filename.sub(/[^\w\.\-]/,'_') 
  end
  
end
