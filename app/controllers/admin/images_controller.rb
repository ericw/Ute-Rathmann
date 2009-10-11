class Admin::ImagesController < ApplicationController
  layout "admin"
  active_scaffold :images do |config|

    config.list.columns = [:id, :title, :description, :size, :year, :position, :series, :width, :height, :width_thumb, :height_thumb]

    config.list.per_page = 500
  end

end
