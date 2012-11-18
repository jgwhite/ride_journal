class RidesController < ApplicationController
  def show
    @ride = Ride.find params[:id]
    respond_to do |format|
      format.json { render :json => @ride }
    end
  end
end
