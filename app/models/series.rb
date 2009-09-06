class Series < ActiveRecord::Base
  has_many :images, :order => "position"
end
