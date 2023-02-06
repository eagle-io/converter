import { JtsDocument, TimeSeries } from '@eagle-io/timeseries'
import { Converter } from '../../converter'
import { parse } from 'csv-parse/sync'

/**
 * Converts Cube noise logger file
 */
export class CubeNoiseConverter extends Converter {
  convert (input: Buffer): JtsDocument {
    const allSeries: {
      [key: string]: any
    } = {}

    const data = input.toString('utf-8')
    const records = parse(data, { delimiter: ';', relax_column_count: true, columns: true, from_line: 2 })

    // Extract date from first line
    const firstLine = data.substring(0, data.indexOf('\n'))
    const logDate = firstLine.split(';')[8] // Date is always stored in this location

    // Generate list of all data series. Removes headers that start with numbers
    const headers = Object.keys(records[0]).filter(m => {
      return (m !== 'Time' && /^[^0-9]/.test(m))
    })

    // Create JTS series for each data series
    for (const header of headers) {
      allSeries[header] = new TimeSeries({ name: header, type: 'NUMBER' })
    }

    for (const row of records) {
      // Stop processing file after the first blank row
      if (row.Time === '') {
        break
      }

      const ts = new Date(`${logDate} ${row.Time}`)

      for (const header of headers) {
        if (header === 'Latitude' || header === 'Longitude') {
          allSeries[header].insert({ timestamp: ts, value: row[header] })
        } else {
          allSeries[header].insert({ timestamp: ts, value: Number(row[header]) })
        }
      }
    }

    return new JtsDocument({ series: Object.values(allSeries) })
  }
}
