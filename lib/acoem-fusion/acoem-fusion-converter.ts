import { JtsDocument, TimeSeries } from '@eagle-io/timeseries'
import { Converter } from '../../converter'

/**
* Converts sample AcoemXML -> JTS.
*/
export class AcoemFusionConverter extends Converter {
  convert (input: Buffer, timezone: string): JtsDocument {
    const xml = input.toString('utf-8')

    const series: {
      [key: string]: any
    } = {}

    // regex out xml values
    const timestamp = /(\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}:\d{2})/.exec(xml)
    const values = /<Values>(.*?)<\/Values>/.exec(xml)
    const spec1 = /<Spectrum1>(.*?)<\/Spectrum1>/.exec(xml)
    const spec2 = /<Spectrum2>(.*?)<\/Spectrum2>/.exec(xml)
    const weather = /<Weather>(.*?)<\/Weather>/.exec(xml)

    // payload has timestamp
    if (timestamp != null) {
      // format time and create new date

      const ts = this.dayjs.tz(((timestamp[1]).replace('/', '-').replace('/', '-').replace(' ', 'T')), timezone)

      if (values != null) {
        // split values by delimeter
        const valuesArray = values[1].split(';')
        for (let i = 0; i < valuesArray.length; i++) {
          const name: string = 'value_' + String(i + 1)
          // Create JTS series for each data series
          series[name] = new TimeSeries({ name: name, type: 'NUMBER' })
          // Insert the measures
          series[name].insert({ timestamp: ts.toDate(), value: Number(valuesArray[i]) })
        }
      }

      if (spec1 != null) {
        const specArray = spec1[1].split(';')
        for (let i = 0; i < specArray.length; i++) {
          const name: string = 'spec1_' + String(i + 1)
          // Create JTS series for each data series
          series[name] = new TimeSeries({ name: name, type: 'NUMBER' })
          // Insert the measures
          series[name].insert({ timestamp: ts.toDate(), value: Number(specArray[i]) })
        }
      }

      if (spec2 != null) {
        const specArray = spec2[1].split(';')
        for (let i = 0; i < specArray.length; i++) {
          const name: string = 'spec2_' + String(i + 1)
          // Create JTS series for each data series
          series[name] = new TimeSeries({ name: name, type: 'NUMBER' })
          // Insert the measures
          series[name].insert({ timestamp: ts.toDate(), value: Number(specArray[i]) })
        }
      }

      if (weather != null) {
        const weatherArray = weather[1].split(';')
        for (let i = 0; i < weatherArray.length; i++) {
          const name: string = 'weather_' + String(i + 1)
          // Create JTS series for each data series
          series[name] = new TimeSeries({ name: name, type: 'NUMBER' })
          // Insert the measures
          series[name].insert({ timestamp: ts.toDate(), value: Number(weatherArray[i]) })
        }
      }
    }

    return new JtsDocument({ series: Object.values(series) })
  }
}
