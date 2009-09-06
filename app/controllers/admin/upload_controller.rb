class Admin::UploadController < ApplicationController
  layout "admin"
  
  def index
  end
  
  def create
    # store the thumb and full image
    #puts params[:image][:full_size_image]
    
    @image = Series.find(1).images.build(params[:image] || {})
        
    @image.save!
    flash[:notice] = "Image uploaded!"
    redirect_to :action => 'index'
  end
  
end