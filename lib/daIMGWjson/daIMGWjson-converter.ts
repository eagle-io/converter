import { JtsDocument, TimeSeries } from '@eagle-io/timeseries'
import { Converter } from '../../converter'

/**
 * Convert the JSON data from IMGW meteo station
 * exemple : https://hydro.imgw.pl/api/station/meteo/?id=250200370
 * 
 *
 */
export class daimgwjsonConverter extends Converter {
  convert (input: Buffer): JtsDocument {
    const series1 = new TimeSeries({ name: 'hourlyPrecip'})  
    const series2 = new TimeSeries({ name: 'airTemperatureRecords'})  
    const series3 = new TimeSeries({ name: 'windVelocityObsRecords'})  

    // Get the records
    const records = JSON.parse(input.toString())

    // Iterate over each record hourlyPrecipRecords and convert to eagle-io's format
    records.hourlyPrecipRecords.forEach((row: {
      date: string,
      value: string }) => {
      const ts = new Date(row.date)
      series1.insert({ timestamp: ts, value: Number(row.value) })
    })
    // Iterate over each record airTemperatureRecords and convert to eagle-io's format
    records.airTemperatureRecords.forEach((row: {
      date: string,
      value: string }) => {
      const ts = new Date(row.date)
      series2.insert({ timestamp: ts, value: Number(row.value) })
    })
    // Iterate over each record windVelocityObsRecords and convert to eagle-io's format
    records.windVelocityObsRecords.forEach((row: {
      date: string,
      value: string }) => {
      const ts = new Date(row.date)
      series1.insert({ timestamp: ts, value: Number(row.value) })	
	})
	  
    return new JtsDocument({ series: [series1] })
  }
}
