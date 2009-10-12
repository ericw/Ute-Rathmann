class SeriesController < ApplicationController

  def index
    @series = Series.find(:all, :order => 'position', :conditions => ["visible = ?", true])
  end

end
