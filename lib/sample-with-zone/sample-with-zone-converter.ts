import { JtsDocument, TimeSeries } from '@eagle-io/timeseries'
import { Converter } from '../../converter'
import { parse } from 'csv-parse/sync'

/**
 * Converts sample timeseries CSV -> JTS.
 */
export class SampleWithZoneConverter extends Converter {
  convert (input: Buffer, timezone: string): JtsDocument {
    const series1 = new TimeSeries({ name: 'first', type: 'NUMBER' })
    const series2 = new TimeSeries({ name: 'second', type: 'TEXT' })
    const series3 = new TimeSeries({ name: 'third', type: 'TEXT' })
    const csv = input.toString('utf-8')
    const records = parse(csv, { columns: true })

    records.forEach((row: {timestamp: string, first: string, second: string, third: string}) => {
      const ts = this.dayjs.tz(row.timestamp, timezone)
      series1.insert({ timestamp: ts.toDate(), value: Number(row.first) })
      series2.insert({ timestamp: ts.toDate(), value: row.second })
      series3.insert({ timestamp: ts.toDate(), value: row.third })
    })

    return new JtsDocument({ series: [series1, series2, series3] })
  }
}
