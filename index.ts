import { JtsDocument } from '@eagle-io/timeseries'
import { SampleConverter } from './lib/sample'
import { Converter } from './converter'

function convert (converter: Converter, input: string): JtsDocument {
  return converter.convert(Buffer.from(input))
}

export const sampleConverter = (input: string): JtsDocument => {
  return convert(new SampleConverter(), input)
}
