class Admin::SeriesInfosController < ApplicationController
  layout "admin"
  active_scaffold :series_infos do |config|

    config.list.columns = [:id, :title, :description]

    config.list.per_page = 500
  end

end