class SeriesController < ApplicationController
  caches_page :index

  def index
    @series = Series.find(:all, :order => 'position', :conditions => ["visible = ?", true])
  end

end
