import { JtsDocument } from '@eagle-io/timeseries'
import { Converter } from './converter'
import { SampleConverter } from './lib/sample/sample-converter'
import { QuantAQModulairConverter } from './lib/quantaq-modulair/quantaq-modulair-converter'
import { AecomNoiseConverter } from './lib/aecom-noise/aecom-noise-converter'
import { AecomVibrationConverter } from './lib/aecom-vibration/aecom-vibration-converter'

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

export const quantAqModulairConverter = async (input: ConverterInput): Promise<JtsDocument> => {
  return convert(new QuantAQModulairConverter(), input)
}

export const aecomNoiseConverter = async (input: ConverterInput): Promise<JtsDocument> => {
  return convert(new AecomNoiseConverter(), input)
}

export const aecomVibrationConverter = async (input: ConverterInput): Promise<JtsDocument> => {
  return convert(new AecomVibrationConverter(), input)
}
