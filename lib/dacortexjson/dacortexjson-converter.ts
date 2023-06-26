import { JtsDocument, TimeSeries } from '@eagle-io/timeseries'
import { Converter } from '../../converter'

/**
 * Convert DANONE standard Json format
 * Documentation available on request
 */
export class DaCortexJsonConverter extends Converter {
  convert (input: Buffer): JtsDocument {
    const series: {
    [key: string]: any
  } = {}
  // Get the records
    const records = JSON.parse(input.toString())
    const ts = new Date(records.timeStamp)

    // Get the headers, measures and dataypes
    const headers = records.payload.name
    const measures = records.payload.value
    const types = records.payload.dataType

    // Loop over headers
    for (var i = 0; i < headers.length; i++) {
      // Create JTS series for each data series
      series[headers[i]] = new TimeSeries({ name: headers[i], type: types[i] === 'String' ? 'TEXT' : 'NUMBER' })
      // Insert the measures
      series[headers[i]].insert({ timestamp: ts, value: types[i] === 'String' ? measures[i] : Number(measures[i]) })
    }

    return new JtsDocument({ series: Object.values(series) })
  }
}
