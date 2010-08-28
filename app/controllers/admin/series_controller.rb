class Admin::SeriesController < ApplicationController
  layout "admin"

  USER_ID, PASSWORD = "ute", "wettermann?"

  # Require authentication only for edit and delete operation
  before_filter :authenticate, :only => [ :index ]

  active_scaffold :series do |config|
    config.list.columns = [:id, :title, :position, :visible, :series_info]
    config.list.per_page = 500
  end

  private
    def authenticate
      authenticate_or_request_with_http_basic do |id, password| 
        id == USER_ID && password == PASSWORD
      end
    end

end