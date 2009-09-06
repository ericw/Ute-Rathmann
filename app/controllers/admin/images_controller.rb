class Admin::ImagesController < ApplicationController
  layout "admin"
  active_scaffold :images
  
  active_scaffold :images do |config|
    config.list.columns.exclude :created_at, :updated_at
    config.list.per_page = 500

  end

end
