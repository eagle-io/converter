import { JtsDocument, TimeSeries } from '@eagle-io/timeseries'
import { Converter } from '../../converter'

/**
 * Converts Aecom vibration logger file
 */
export class AecomVibrationConverter extends Converter {
  convert (input: Buffer): JtsDocument {
    const series1 = new TimeSeries({ name: 'VM VSum (X,Y,Z)', type: 'NUMBER' })
    let startDate: string | undefined = ''
    let startTime: string | undefined = ''

    const records = input.toString('utf-8').split('\n')

    for (const row of records) {
      // Rows starting with # contain the base timestamp
      if (row[0] === '#') {
        if (!startDate && row.startsWith('# StartDate=')) {
          startDate = row.split('=').pop()
        }
        if (!startTime && row.startsWith('# StartTime=')) {
          startTime = row.split('=').pop()
        }
      } else if (row !== '') {
        const dataRow = row.split(' ')
        const baseTs = new Date(`${startDate} ${startTime}`)
        const ts = new Date(baseTs.getTime() + Number(dataRow[0]) * 1000) // Each row contains a time offset from the base in seconds
        series1.insert({ timestamp: ts, value: Number(dataRow[4]) }) // VM VSum (X,Y,Z) is in the 5 column
      } else {
        break // Stop processing after first empty line
      }
    }

    return new JtsDocument({ series: [series1] })
  }
}
