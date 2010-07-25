class Series < ActiveRecord::Base
  acts_as_list
  has_many :images, :order => "position"
  has_one :series_info
end
