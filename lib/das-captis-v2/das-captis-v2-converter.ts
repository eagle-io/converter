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
      signalStrength: new TimeSeries({ name: 'signalStrength', type: 'NUMBER', units: 'dBm' })
    }
    const serverTime = this.dayjs().toDate()

    records.forEach((parts: string[]) => {
      const id = parts[0]

      if (id === '200') {
        const timestamp = this.dayjs(parts[5]).toDate()
        const value = Number(parts[3])
        const seriesName = parts[1]

        if (seriesName === 'flow' || seriesName === 'flow1' || seriesName === 'flow2') {
          if (!seriesMap[seriesName]) {
            seriesMap[seriesName] = new TimeSeries({ name: seriesName, type: 'NUMBER' })
          }
          seriesMap[seriesName].insert({ timestamp, value })
        }
        return
      }

      if (parts.length === 2) {
        seriesMap.event.insert({ timestamp: this.dayjs(parts[1]).toDate(), value: parts[0] })
        return
      }

      if (id === 'l003' && parts[1] && this.dayjs(parts[1]).isValid()) {
        const timestamp = this.dayjs(parts[1]).toDate()
        if (!seriesMap.flow) {
          seriesMap.flow = new TimeSeries({ name: 'flow', type: 'NUMBER' })
        }
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
