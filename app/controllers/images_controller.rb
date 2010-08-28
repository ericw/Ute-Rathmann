class ImagesController < ApplicationController
  caches_page :show

  def show
    @image = Image.find(params[:id])
    @series = Series.find(:all, :order => 'position', :conditions => ["visible = ?", true])
    render "series/index"
  end

  def buy
    if request.post?
      Mailer::deliver_buy(params[:buy])
      render :text => "message sent"
    end
  end
  
end
