class Admin::SeriesController < ApplicationController
  layout "admin"
  active_scaffold :series do |config|

    config.list.columns = [:id, :title, :position, :visible]

    config.list.per_page = 500
  end

end