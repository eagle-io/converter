import { JtsDocument, TimeSeries } from '@eagle-io/timeseries'
import { Converter } from '../../converter'
import { parse } from 'csv-parse/sync'

interface SeriesMap {
    [key: string]: TimeSeries<string | number>;
  }

export class DASCaptisV2Converter extends Converter {
  convert (input: Buffer): JtsDocument {
    const csv = input.toString('utf-8')
    const records = parse(csv, { delimiter: ',', skip_empty_lines: true, relax_column_count: true })
    const seriesMap: SeriesMap = {
      event: new TimeSeries({ name: 'eventCode + eventNotes', type: 'TEXT' }),
      battery: new TimeSeries({ name: 'battery', type: 'NUMBER', units: 'V' }),
      signalStrength: new TimeSeries({ name: 'signalStrength', type: 'NUMBER', units: 'dBm' }),
      flow: new TimeSeries({ name: 'flow', type: 'NUMBER' }),
      flow1: new TimeSeries({ name: 'flow1', type: 'NUMBER' }),
      flow2: new TimeSeries({ name: 'flow2', type: 'NUMBER' }),
      modbus_flow: new TimeSeries({ name: 'modbus_flow', type: 'NUMBER' })
    }
    const serverTime = this.dayjs().toDate()

    records.forEach((parts: string[]) => {
      const id = parts[0]

      if (id === '200') {
        const timestamp = this.dayjs(parts[5]).toDate()
        const value = Number(parts[3])

        switch (parts[1]) {
          case 'flow1':
            seriesMap.flow1.insert({ timestamp, value })
            break
          case 'flow2':
            seriesMap.flow2.insert({ timestamp, value })
            break
          case 'flow':
            seriesMap.modbus_flow.insert({ timestamp, value })
            break
        }
        return
      }

      if (parts.length === 2) {
        seriesMap.event.insert({ timestamp: this.dayjs(parts[1]).toDate(), value: parts[0] })
        return
      }

      if (id === 'l003' && parts[1] && this.dayjs(parts[1]).isValid()) {
        const timestamp = this.dayjs(parts[1]).toDate()
        seriesMap.flow.insert({ timestamp, value: Number(parts[2]) })
        return
      }

      if (id === 'l011') {
        let timestamp = serverTime
        if (parts[1] && this.dayjs(parts[1]).isValid()) {
          timestamp = this.dayjs(parts[1]).toDate()
        }
        seriesMap.battery.insert({ timestamp, value: Number(parts[2]) })
        return
      }

      if (id === 'radio' && parts[2] !== undefined) {
        let timestamp = serverTime
        if (parts[1] && this.dayjs(parts[1]).isValid()) {
          timestamp = this.dayjs(parts[1]).toDate()
        }
        seriesMap.signalStrength.insert({ timestamp, value: Number(parts[2]) })
      }
    })

    return new JtsDocument({ series: Object.values(seriesMap) })
  }
}
