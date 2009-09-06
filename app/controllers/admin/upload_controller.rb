class Admin::UploadController < ApplicationController
  layout "admin"
  
  def index
  end
  
  def create
    # store the thumb and full image
    #puts params[:image][:full_size_image]
    
    @image = Series.find(1).images.build(params[:image] || {})
    #@image = Image.save(params[:image] || {})
        
    @image.save!
    redirect_to :action => 'index'
  end
  
end