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
    const seriesMap: SeriesMap = {}
    const serverTime = this.dayjs().toDate()

    seriesMap.Event = new TimeSeries({ name: 'Event', type: 'TEXT' })

    records.forEach((parts: string[]) => {
      const id = parts[0]

      if (id === '200') {
        const seriesName = `Modbus_${parts[1]}`
        if (!seriesMap[seriesName]) {
          seriesMap[seriesName] = new TimeSeries({ name: seriesName, type: 'NUMBER', units: parts[4] })
        }
        const timestamp = this.dayjs(parts[5]).toDate()
        seriesMap[seriesName].insert({ timestamp, value: Number(parts[3]) })
        return
      }

      if (parts.length === 2) {
        seriesMap.Event.insert({ timestamp: this.dayjs(parts[1]).toDate(), value: parts[0] })
        return
      }

      if (id.startsWith('l')) {
        if (!seriesMap[id]) {
          seriesMap[id] = new TimeSeries({ name: id, type: 'NUMBER', units: parts[3] })
        }

        let timestamp = serverTime
        if (parts[1] && this.dayjs(parts[1]).isValid()) {
          timestamp = this.dayjs(parts[1]).toDate()
        }

        seriesMap[id].insert({ timestamp, value: Number(parts[2]) })
        return
      }

      if (id === 'radio') {
        if (!seriesMap[id]) {
          seriesMap[id] = new TimeSeries({ name: id, type: 'NUMBER' })
        }

        let timestamp = serverTime
        if (parts[1] && this.dayjs(parts[1]).isValid()) {
          timestamp = this.dayjs(parts[1]).toDate()
        }

        if (parts[2] !== undefined) {
          seriesMap[id].insert({ timestamp, value: Number(parts[2]) })
        }
      }
    })

    return new JtsDocument({ series: Object.values(seriesMap) })
  }
}
