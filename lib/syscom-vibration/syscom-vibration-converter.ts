import { JtsDocument, TimeSeries } from '@eagle-io/timeseries'
import { Converter } from '../../converter'

/**
 * Converts Syscom vibration logger file
 */
export class SyscomVibrationConverter extends Converter {
  convert (input: Buffer): JtsDocument {
    const series: {
    [key: string]: any
  } = {}

    let startDate: string | undefined = ''
    let startTime: string | undefined = ''
    const headers: string[] = []

    const records = input.toString('utf-8').split('\n')

    for (const [index, row] of records.entries()) {
      // Rows starting with # contain the base timestamp and header names
      if (row[0] === '#') {
        if (!startDate && row.startsWith('# StartDate=')) {
          startDate = row.split('=').pop()
        }
        if (!startTime && row.startsWith('# StartTime=')) {
          startTime = row.split('=').pop()
        }
        // Generate array of headers
        if (headers.length === 0 && row.startsWith('# [Columns]')) {
          let i = index + 1
          while (/# \d/.test(records[i])) { // Header names are on rows that start with a # and number
            const dataHeader = String(records[i].split('=').pop())
            if (dataHeader !== 'Time') {
              headers.push(dataHeader)
              series[dataHeader] = new TimeSeries({ name: dataHeader, type: 'NUMBER' }) // Create JTS series for each data series except Time
            }
            i = i + 1
          }
        }
      } else if (row !== '') {
        const dataRow = row.split(' ')
        const baseTs = new Date(`${startDate} ${startTime}`)
        const ts = new Date(baseTs.getTime() + Number(dataRow[0]) * 1000) // Each row contains a time offset from the base in seconds

        for (const [index, header] of headers.entries()) {
          series[header].insert({ timestamp: ts, value: Number(dataRow[index + 1]) })
        }
      } else {
        break // Stop processing after first empty line
      }
    }

    return new JtsDocument({ series: Object.values(series) })
  }
}
