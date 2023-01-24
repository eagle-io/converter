import { JtsDocument, TimeSeries } from '@eagle-io/timeseries'
import { Converter } from '../../converter'
import { parse } from 'csv-parse/sync'

/**
 * 
 */

export class QuantAQModulairConverter extends Converter {
    convert (input: Buffer): JtsDocument {
        const series1 = new TimeSeries({ name: 'first', type: 'NUMBER' });


        records.forEach((row: {}) => {
            const ts = new Date(row.timestamp)
        })

        return new JtsDocument({ series: [series1] })
    }
}