import { JtsDocument, TimeSeries } from '@eagle-io/timeseries'
import { Converter } from '../../converter'
import { parse } from 'csv-parse/sync'

/**
 * Converts Aecom noise logger file
 */
export class AecomNoiseConverter extends Converter {
  convert (input: Buffer): JtsDocument {
    const series1 = new TimeSeries({ name: 'LAeq', type: 'NUMBER' })

    const csv = input.toString('utf-8')
    const records = parse(csv, { delimiter: ';', relax_column_count: true })
    const logDate = records[0][8] // Date is always stored in this location

    for (const [index, row] of records.entries()) {
      // Stop processing file after the first blank row
      if (row[0] === '') {
        break
      }

      // Sensor data is located from row 3 onwards
      if (index > 1) {
        const ts = new Date(`${logDate} ${row[0]}`)
        series1.insert({ timestamp: ts, value: Number(row[1]) })
      }
    }

    return new JtsDocument({ series: [series1] })
  }
}
