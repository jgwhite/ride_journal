class HelloWorldController < ApplicationController
  def show
    render :text => 'Hello World'
  end
end
