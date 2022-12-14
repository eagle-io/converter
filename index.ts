import { JtsDocument } from '@eagle-io/timeseries'
import { Converter } from './converter'
import { SampleConverter } from './lib/sample/sample-converter'

interface ConverterInput {
  payload: string
}

function convert (converter: Converter, input: ConverterInput): JtsDocument {
  const payload = Buffer.from(input.payload, 'base64')
  const output: JtsDocument = converter.convert(payload)

  console.log(`Converted ${payload.length} bytes to ${output.series.length} series with ${output.series.reduce((sum, current) => sum + current.length, 0)} fields in total`)
  console.log(`INPUT: ${payload.toString()}`)
  console.log(`OUTPUT: ${output.toString()}`)

  return output
}

// https://docs.aws.amazon.com/lambda/latest/dg/typescript-handler.html
export const sampleConverter = async (input: ConverterInput): Promise<JtsDocument> => {
  return convert(new SampleConverter(), input)
}
