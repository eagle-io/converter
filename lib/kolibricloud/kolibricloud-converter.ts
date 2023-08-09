import { JtsDocument, TimeSeries } from '@eagle-io/timeseries'
import { Converter } from '../../converter'

/**
 * Convert the JSON data from kolibricloud.ch (Keller water level sensors)
 * Documentation https://docs.kolibricloud.ch/cloud-interfaces/api/access_details/
 * Exemple: https://api.kolibricloud.ch/v1/Measurements?measurementDefinitionId=11&deviceId=2405&start=2023-08-07&end=2023-08-08&isFiltered=false
 *
 */
export class KolibriCloudConverter extends Converter {
  convert (input: Buffer): JtsDocument {
    // Get the records
    const records = JSON.parse(input.toString())

    // Create JTS series
    const serie = new TimeSeries({ name: 'measurementDefinitionId_' + records.measurementDefinitionId, type: 'NUMBER' })

    // Iterate over each record and convert to eagle-io's format
    records.values.forEach((row: {
      time: string,
      value: string }) => {
      const ts = new Date(row.time + 'Z')
      serie.insert({ timestamp: ts, value: Number(row.value) })
    })

    return new JtsDocument({ series: [serie] })
  }
}
