require 'tmpdir'
class GpsbabelsController < ApplicationController
  def create
    file = params[:file]
    gpsbabel = Gpsbabel.new file
    render :json => gpsbabel.to_hash
  end
end
