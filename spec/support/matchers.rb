RSpec::Matchers.define :take_less_than do |expected|
  match do |actual|
    @bench = Benchmark.measure(&actual).real
    @bench.real < expected
  end

  failure_message_for_should do |actual|
    "expected to take less than #{expected}, actually took #{@bench.real}"
  end
end
