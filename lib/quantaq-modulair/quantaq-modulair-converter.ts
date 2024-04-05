import { JtsDocument, TimeSeries } from '@eagle-io/timeseries'
import { Converter } from '../../converter'

/**
 * Convert the output from QuantAQ's RESTful API for the MODULAIR
 * product.
 *
 * Docs: https://docs.quant-aq.com/api
 */
export class QuantAQModulairConverter extends Converter {
  convert (input: Buffer): JtsDocument {
    const series1 = new TimeSeries({ name: 'sn', type: 'TEXT' })
    const series2 = new TimeSeries({ name: 'pm1', type: 'NUMBER' })
    const series3 = new TimeSeries({ name: 'pm25', type: 'NUMBER' })
    const series4 = new TimeSeries({ name: 'pm10', type: 'NUMBER' })
    const series5 = new TimeSeries({ name: 'tsp', type: 'NUMBER' })
    const series6 = new TimeSeries({ name: 'rh', type: 'NUMBER' })
    const series7 = new TimeSeries({ name: 'temp', type: 'NUMBER' })
    const series8 = new TimeSeries({ name: 'ws', type: 'NUMBER' })
    const series9 = new TimeSeries({ name: 'wd', type: 'NUMBER' })
    const series10 = new TimeSeries({ name: 'no', type: 'NUMBER' })
    const series11 = new TimeSeries({ name: 'no2', type: 'NUMBER' })
    const series12 = new TimeSeries({ name: 'o3', type: 'NUMBER' })
    const series13 = new TimeSeries({ name: 'co', type: 'NUMBER' })
    const series14 = new TimeSeries({ name: 'co2', type: 'NUMBER' })

    // Get the records
    const records = JSON.parse(input.toString())

    // Iterate over each record and convert to eagle-io's format
    records.data.forEach((row: {
      timestamp: string,
      sn: string,
      pm1: string,
      pm25: string,
      pm10: string,
      tsp: string,
      no: string,
      no2: string,
      o3: string,
      co: string,
      co2: string,
      met: { rh: string, temp: string, ws: string, wd: string } }) => {
      const ts = new Date(row.timestamp)

      series1.insert({ timestamp: ts, value: row.sn })
      series2.insert({ timestamp: ts, value: parseFloat(row.pm1) })
      series3.insert({ timestamp: ts, value: parseFloat(row.pm25) })
      series4.insert({ timestamp: ts, value: parseFloat(row.pm10) })
      series5.insert({ timestamp: ts, value: parseFloat(row.tsp) })
      series6.insert({ timestamp: ts, value: parseFloat(row.met.rh) })
      series7.insert({ timestamp: ts, value: parseFloat(row.met.temp) })
      series8.insert({ timestamp: ts, value: parseFloat(row.met.ws) })
      series9.insert({ timestamp: ts, value: parseFloat(row.met.wd) })
      series10.insert({ timestamp: ts, value: parseFloat(row.no) })
      series11.insert({ timestamp: ts, value: parseFloat(row.no2) })
      series12.insert({ timestamp: ts, value: parseFloat(row.o3) })
      series13.insert({ timestamp: ts, value: parseFloat(row.co) })
      series14.insert({ timestamp: ts, value: parseFloat(row.co2) })
    })

    return new JtsDocument({ series: [series1, series2, series3, series4, series5, series6, series7, series8, series9, series10, series11, series12, series13, series14] })
  }
}
