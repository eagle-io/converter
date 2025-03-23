import { JtsDocument, TimeSeries } from '@eagle-io/timeseries'
import { Converter } from '../../converter'

/**
 * Convert DANONE rubix Json format
 * Documentation available on request
 */
export class DaRubixJsonConverter extends Converter {
  convert (input: Buffer): JtsDocument {
    const series: { [key: string]: any } = {}
    // Get the records
    const records = JSON.parse(input.toString())
    const ts = new Date(records.timestamp)

    // Get the parameters names
    const parameterKeys = Object.keys(records.parameters)

    // Loop over parameters
    for (var i = 0; i < parameterKeys.length; i++) {
      // Create JTS series for each data series
      series[parameterKeys[i]] = new TimeSeries({ name: parameterKeys[i], type: 'NUMBER' })
      // Insert the measures
      series[parameterKeys[i]].insert({ timestamp: ts, value: Number(records.parameters[parameterKeys[i]]) })
    }

    return new JtsDocument({ series: Object.values(series) })
  }
}
