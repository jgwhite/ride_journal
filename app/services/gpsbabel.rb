require 'tmpdir'

class Gpsbabel
  attr_reader :source

  def initialize source
    @source = source
  end

  def to_hash
    Hash.from_xml to_gpx
  end

  def to_gpx
    if source_is_gpx?
      source.read
    else
      create_gpx_and_read
    end
  end

  def source_type
    File.extname source_filename
  end

  def source_filename
    if source.respond_to?(:original_filename)
      source.original_filename
    else
      File.basename source.path
    end
  end

  def source_is_gpx?
    source_type == '.gpx'
  end

  private

  def create_gpx_and_read
    data = nil

    in_tmp_dir do
      intype = gpsbabel_type
      infile = 'input' + source_type

      outtype = 'gpx'
      outfile = 'ouput.gpx'

      File.open(infile, 'wb') { |f| f << source.read }

      `gpsbabel -i #{intype} -f #{infile} -o #{outtype} -F #{outfile}`

      data = File.read outfile
    end

    data
  end

  def in_tmp_dir &block
    Dir.mktmpdir do |tmpdir|
      Dir.chdir tmpdir, &block
    end
  end

  def gpsbabel_type
    case source_type
    when '.fit' then 'garmin_fit'
    when '.gpx' then 'gpx'
    end
  end
end
