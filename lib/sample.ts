import { JtsDocument, TimeSeries } from '@eagle-io/timeseries'
import { Converter } from '../converter'
import { parse } from 'csv-parse/sync'

export class SampleConverter extends Converter {
  convert (input: Buffer): JtsDocument {
    const csv = input.toString('utf-8')
    const series1 = new TimeSeries({ type: 'NUMBER' })
    const series2 = new TimeSeries({ type: 'TEXT' })
    const series3 = new TimeSeries({ type: 'TEXT' })

    parse(csv, { columns: true }).forEach((row: {timestamp: string, first: string, second: string, third: string}) => {
      const ts = new Date(row.timestamp)
      series1.insert({ timestamp: ts, value: Number(row.first) })
      series2.insert({ timestamp: ts, value: row.second })
      series3.insert({ timestamp: ts, value: row.third })
    })

    return new JtsDocument({ series: [series1, series2, series3] })
  }
}
