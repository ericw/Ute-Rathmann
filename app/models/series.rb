class Series < ActiveRecord::Base
  has_many :images, :order => "position"
  has_one :series_info
end
