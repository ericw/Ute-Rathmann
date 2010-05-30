class ImagesController < ApplicationController

  def show
    @image = Image.find(params[:id])
    render :layout => false
  end

  def buy
    if request.post?
      Mailer::deliver_buy(params[:buy])
      render :text => "message sent"
    end
  end
  
end
