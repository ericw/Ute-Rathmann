class SeriesController < ApplicationController

  def index
    @series = Series.find(:all)
  end

end
