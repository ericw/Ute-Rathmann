class Mailer < ActionMailer::Base
    
  def message(author)
    @recipients       = "eric@wahlforss.com"
    @from             = author[:email]
    @subject          = "New message"
    @body['name']     = author[:name]
    @body['email']    = author[:email]
    @body['message']  = author[:message]
  end

end