import { JtsDocument, TimeSeries } from '@eagle-io/timeseries'
import { Converter } from '../../converter'
import { parse } from 'csv-parse/sync'

/**
 * Converts Cube noise logger file
 */
export class CubeNoiseConverter extends Converter {
  convert (input: Buffer): JtsDocument {
    interface SeriesObject {
      [key: string]: any
  }

    const allSeries: SeriesObject = {}

    const data = input.toString('utf-8')
    const firstLineIndex = data.indexOf('\n')
    const csv = data.substring(firstLineIndex + 1) // Remove first line to process leftover string as csv
    const firstLine = data.substring(0, firstLineIndex)

    const records = parse(csv, { delimiter: ';', relax_column_count: true, columns: true })
    const logDate = firstLine.split(';')[8] // Date is always stored in this location

    // Generate list of all data series. Removes duplicate headers
    const fileHeader = Object.values(csv.split('\n', 1)[0].split(';'))
    const headers = fileHeader.filter(m => {
      return (m !== 'Time' && fileHeader.indexOf(m) === fileHeader.lastIndexOf(m))
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
