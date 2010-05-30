class PagesController < ApplicationController
  def vita; end
  def presse; end
  def kontakt; end
  
  def send_contact_form
     if request.post?
       Mailer::deliver_message(params[:author])
       render :text => "message sent"
     end
   end
  
end