class Mailer < ActionMailer::Base
    
  def message(author)
    @recipients       = "eric@wahlforss.com"
    @from             = author[:email]
    @subject          = "New message"
    @body['name']     = author[:name]
    @body['email']    = author[:email]
    @body['message']  = author[:message]
  end

  def buy(buy)
    @recipients       = "eric@wahlforss.com"
    @from             = buy[:email]
    @subject          = "Kaufinteresse"
    @body['id']     = buy[:id]
    @body['title']    = buy[:title]
    @body['name']     = buy[:name]
    @body['email']    = buy[:email]
    @body['message']  = buy[:message]
  end

end