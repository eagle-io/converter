import { JtsDocument } from '@eagle-io/timeseries'
import { Converter } from './converter'
import { SampleConverter } from './lib/sample'

interface ConverterInput {
  payload: string
}

function convert (converter: Converter, input: ConverterInput): JtsDocument {
  const payload = Buffer.from(input.payload, 'base64')
  return converter.convert(payload)
}

// https://docs.aws.amazon.com/lambda/latest/dg/typescript-handler.html
export const sampleConverter = async (input: ConverterInput): Promise<JtsDocument> => {
  return convert(new SampleConverter(), input)
}
