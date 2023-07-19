import { gzipSync, gunzipSync } from 'node:zlib'
import { JtsDocument } from '@eagle-io/timeseries'
import { Converter } from './converter'
import { SampleConverter } from './lib/sample/sample-converter'
import { QuantAQModulairConverter } from './lib/quantaq-modulair/quantaq-modulair-converter'
import { CubeNoiseConverter } from './lib/cube-noise/cube-noise-converter'
import { SyscomVibrationConverter } from './lib/syscom-vibration/syscom-vibration-converter'
import { SampleWithZoneConverter } from './lib/sample-with-zone/sample-with-zone-converter'
import { DaImgwJsonConverter } from './lib/daimgwjson/daimgwjson-converter'
import { DaCortexJsonConverter } from './lib/dacortexjson/dacortexjson-converter'

interface ConverterInput {
  // filename of received payload (if available)
  filename: string,
  // number of bytes in payload
  size: string,
  // timestamp payload was stored on remote service
  modifiedTime: string,
  // timestamp payload was received by eagle.io
  receivedTime: string,
  // payload bytes, gzip compressed, base64 encoded
  payload: string,
  // datasource timezone
  timezone: string
}

interface ConverterOutput {
  payload?: string, // gzip compressed, base64 encoded
  error?: string
}

function convert (converter: Converter, input: ConverterInput): ConverterOutput {
  try {
    const payload = gunzipSync(Buffer.from(input.payload, 'base64'))
    const output: JtsDocument = converter.convert(payload, input.timezone)

    console.log(`Converted ${input.filename} [${input.size} bytes] to ${output.series.length} series in zone '${input.timezone}' with ${output.series.reduce((sum, current) => sum + current.length, 0)} fields in total`)
    console.log(`INPUT: ${payload.toString()}`)
    console.log(`OUTPUT: ${output.toString()}`)

    return {
      payload: gzipSync(output.toString()).toString('base64')
    }
  } catch (e: unknown) {
    console.error(`ERROR: ${e}`)

    if (e instanceof Error) {
      console.debug(e.stack)
      return {
        error: e.message
      }
    } else {
      return {
        error: 'unknown error'
      }
    }
  }
}

// https://docs.aws.amazon.com/lambda/latest/dg/typescript-handler.html
export const sampleConverter = async (input: ConverterInput): Promise<ConverterOutput> => {
  return convert(new SampleConverter(), input)
}

export const sampleWithZoneConverter = async (input: ConverterInput): Promise<ConverterOutput> => {
  return convert(new SampleWithZoneConverter(), input)
}

export const quantAqModulairConverter = async (input: ConverterInput): Promise<ConverterOutput> => {
  return convert(new QuantAQModulairConverter(), input)
}

export const cubeNoiseConverter = async (input: ConverterInput): Promise<ConverterOutput> => {
  return convert(new CubeNoiseConverter(), input)
}

export const syscomVibrationConverter = async (input: ConverterInput): Promise<ConverterOutput> => {
  return convert(new SyscomVibrationConverter(), input)
}

export const imgwMetConverter = async (input: ConverterInput): Promise<ConverterOutput> => {
  return convert(new DaImgwJsonConverter(), input)
}

export const danoneCortexConverter = async (input: ConverterInput): Promise<ConverterOutput> => {
  return convert(new DaCortexJsonConverter(), input)
}
