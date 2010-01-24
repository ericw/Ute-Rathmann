class PagesController < ApplicationController
  def vita; end
  def presse; end
  def kontakt; end
  
  def send_contact_form
     if request.post?
       Mailer::deliver_message(params[:author])
       #redirect_to :action => 'kontakt'
       #flash[:notice] = "Thanks for your message!"
       render :text => "message sent"
     end
   end
  
end