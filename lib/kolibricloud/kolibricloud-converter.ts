import { JtsDocument, TimeSeries } from '@eagle-io/timeseries'
import { Converter } from '../../converter'
import * as fs from 'fs'

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

    // Get the parameters and units list
    const buff = fs.readFileSync('lib/kolibricloud/kolibri_param_unit_id_list.txt')
    const paramunit = JSON.parse(buff.toString())

    const findUnit = (id:string) => {
      return paramunit.units.find((unit:any) => unit.id === id).unitSymbol
    }
    const findParam = (id:string) => {
      return paramunit.measurementsDefinitionIds.find((param:any) => param.id === id).name
    }

    // Get the parameter and unit name
    const param = findParam(records.measurementDefinitionId)
    const unit = findUnit(records.unitId)

    // Create JTS series
    const serie = new TimeSeries({ name: param, units: unit, type: 'NUMBER' })

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
