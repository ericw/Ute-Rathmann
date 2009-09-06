class Image < ActiveRecord::Base
  belongs_to :series
  acts_as_list :scope => :series

  validates_presence_of   :title, :description, :size
  validates_numericality_of :width, :height, :width_thumb, :height_thumb
  
  def public_path
    "/images/full/#{filename}"
  end

  def public_thumb_path
    "/images/thumbs/#{filename_thumb}"
  end
  
  # save the full size image
  def full_size_image=(uploaded_file)
    name =  uploaded_file.original_filename
    directory = "public/images/full"
    # create the file path
    path = File.join(directory, name)

    raise ActiveRecord::RecordInvalid if !File.exist?(path)
    # write the file
    File.open(path, "wb") { |f| f.write(uploaded_file.read) }
  end

  # save the full size image
  def thumb_size_image=(uploaded_file)
    name =  uploaded_file.original_filename
    directory = "public/images/thumbs"
    # create the file path
    path = File.join(directory, name)

    raise ActiveRecord::RecordInvalid if !File.exist?(path)
    # write the file
    File.open(path, "wb") { |f| f.write(uploaded_file.read) }
  end

  def cleanup
    File.delete("#{RAILS_ROOT}/dirname/#{@filename}") if File.exist?("#{RAILS_ROOT}/dirname/#{@filename}")
  end
  
end
