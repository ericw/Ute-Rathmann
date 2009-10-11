class SeriesController < ApplicationController

  def index
    @series = Series.find(:all, :order => 'position')
  end

end
