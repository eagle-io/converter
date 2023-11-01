import { JtsDocument, TimeSeries } from '@eagle-io/timeseries'
import { Converter } from '../../converter'


/**
 * Converts sample AcoemXML -> JTS.
 */
export class AcoemFusionConverter extends Converter {
  convert(input: Buffer): JtsDocument {
    const xml = input.toString('utf-8')

    let ts: Date = new Date(Date.now());

    const timestamp = /(\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}:\d{2})/.exec(xml);

    if (timestamp != null) {
      ts = new Date(((timestamp[1]+"Z").replace("/","-").replace("/","-").replace(" ","T")))
    }

    const WindSpeedSeries = new TimeSeries({ name: 'WindSpeed', type: 'NUMBER' })
    const WindDirectionSeries = new TimeSeries({ name: 'WindDirection', type: 'NUMBER' })
    const RainIntensitySeries = new TimeSeries({ name: 'RainIntensity', type: 'NUMBER' })
    const BarometricPressureSeries = new TimeSeries({ name: 'BarometricPressure', type: 'NUMBER' })
    const AirTemperatureSeries = new TimeSeries({ name: 'AirTemperature', type: 'NUMBER' })
    const RelativeHumiditySeries = new TimeSeries({ name: 'RelativeHumidity', type: 'NUMBER' })

    const weather  = /<Weather>(.*?)<\/Weather>/.exec(xml)

    if (weather != null) {
      const weatherArray = weather[1].split(';')
      WindSpeedSeries.insert({ timestamp: ts, value: Number(weatherArray[0]) })
      WindDirectionSeries.insert({ timestamp: ts, value: Number(weatherArray[1]) })
      RainIntensitySeries.insert({ timestamp: ts, value: Number(weatherArray[2]) })
      BarometricPressureSeries.insert({ timestamp: ts, value: Number(weatherArray[3]) })
      AirTemperatureSeries.insert({ timestamp: ts, value: Number(weatherArray[4]) })
      RelativeHumiditySeries.insert({ timestamp: ts, value: Number(weatherArray[5]) })
    }
    
    return new JtsDocument({ series: [WindSpeedSeries, WindDirectionSeries, RainIntensitySeries, BarometricPressureSeries, AirTemperatureSeries, RelativeHumiditySeries] });
  }
}
