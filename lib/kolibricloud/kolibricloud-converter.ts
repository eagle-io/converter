import { JtsDocument, TimeSeries } from '@eagle-io/timeseries'
import { Converter } from '../../converter'
import { Units, MeasurementDefinitions } from './kolibri-param-unit-id-list'

/**
 * Convert the JSON data from kolibricloud.ch (Keller water level sensors)
 * Documentation https://docs.kolibricloud.ch/cloud-interfaces/api/access_details/
 * Example: https://api.kolibricloud.ch/v1/Measurements?measurementDefinitionId=11&deviceId=2405&start=2023-08-07&end=2023-08-08&isFiltered=false
 */
export class KolibriCloudConverter extends Converter {
  convert (input: Buffer): JtsDocument {
    // Get the records
    const records = JSON.parse(input.toString())

    const findUnit = (id:number) => {
      return Units.find((unit) => unit.id === id)?.unitSymbol
    }
    const findParam = (id:number) => {
      return MeasurementDefinitions.find((param) => param.id === id)?.name
    }

    // Get the parameter and unit name
    const param = findParam(records.measurementDefinitionId) || records.measurementDefinitionId
    const unit = findUnit(records.unitId) || ''

    // Create JTS series
    const series = new TimeSeries({ name: param, units: unit, type: 'NUMBER' })

    // Iterate over each record and convert to eagle-io's format
    records.values.forEach((row: {
      time: string,
      value: string }) => {
      const ts = new Date(row.time + 'Z')
      series.insert({ timestamp: ts, value: Number(row.value) })
    })

    return new JtsDocument({ series: [series] })
  }
}
