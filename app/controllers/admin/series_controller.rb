class Admin::SeriesController < ApplicationController
  layout "admin"
  active_scaffold :series
end