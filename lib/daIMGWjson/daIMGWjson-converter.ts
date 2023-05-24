import { JtsDocument, TimeSeries } from '@eagle-io/timeseries'
import { Converter } from '../../converter'

/**
 * Convert the JSON data from IMGW 
 * 
 *
 */
export class daIMGWjsonConverter extends Converter {
  convert (input: Buffer): JtsDocument {
//    const series1 = new TimeSeries({ name: 'hourlyPrecip', type: 'NUMBER' })
    const series1 = new TimeSeries({ name: 'hourlyPrecip'})    
    // Get the records
    const records = JSON.parse(input.toString())

    // Iterate over each record and convert to eagle-io's format
    records.hourlyPrecipRecords.forEach((row: {
      date: string,
      value: string }) => {
      const ts = new Date(row.date)
      series1.insert({ timestamp: ts, value: Number(row.value) })
    })

    return new JtsDocument({ series: [series1] })
  }
}
