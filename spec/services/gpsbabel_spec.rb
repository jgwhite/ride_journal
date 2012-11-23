require 'spec_helper'
require 'benchmark'

describe Gpsbabel do
  def file_fixture name
    File.new Rails.root.join 'spec', 'fixtures', name
  end

  it "parses GPX files" do
    gpsbabel = Gpsbabel.new file_fixture 'example.gpx'
    gpsbabel.to_hash.should include 'gpx'
  end

  it "parses Garmin FIT files" do
    gpsbabel = Gpsbabel.new file_fixture 'example.fit'
    gpsbabel.to_hash.should include 'gpx'
  end

  it "parses a Garmin FIT file in less than two seconds" do
    gpsbabel = Gpsbabel.new file_fixture 'example.fit'
    expect { gpsbabel.to_hash }.to take_less_than 2.seconds
  end
end
