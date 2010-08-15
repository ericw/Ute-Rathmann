class PagesController < ApplicationController
  
  def vita
    @series = Series.find(:all, :order => 'position', :conditions => ["visible = ?", true])
    render "series/index"    
  end
  
  def presse
    vita
  end
  
  def kontakt
    vita
  end

  def impressum
    @series = Series.find(:all, :order => 'position', :conditions => ["visible = ?", true])
  end
  
  def send_contact_form
     if request.post?
       Mailer::deliver_message(params[:author])
       render :text => "message sent"
     end
   end
  
end