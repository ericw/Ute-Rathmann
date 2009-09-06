class Admin::UploadController < ApplicationController
  layout "admin"
  
  def index
  end
  
  def create
    #fixme select what series to save in
    @image = Series.find(1).images.build(params[:image] || {})
    @image.save!
    flash[:notice] = "Image uploaded!"
    redirect_to :action => 'index'
  end
  
end