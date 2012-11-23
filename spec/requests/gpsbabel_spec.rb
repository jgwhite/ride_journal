require 'spec_helper'

describe "Gpsbabel" do
  it "turns FIT into JSON" do
    post '/gpsbabel', :file => fixture_file_upload('example.fit')
    response.content_type.should == :json
    response.code.should == '200'
    response.body.should include '"gpx":'
  end

  it "turns GPX into JSON" do
    post '/gpsbabel', :file => fixture_file_upload('example.gpx')
    response.content_type.should == :json
    response.code.should == '200'
    response.body.should include '"gpx":'
  end
end
