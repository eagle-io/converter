import { JtsDocument, TimeSeries } from '@eagle-io/timeseries'
import { Converter } from '../../converter'
import { parse } from 'csv-parse/sync'
import { constants } from 'buffer';
import { rawListeners } from 'process';

/**
 * Convert the output from QuantAQ's RESTful API for the MODULAIR
 * product.
 * 
 * Docs: https://docs.quant-aq.com/api
 */

export class QuantAQModulairConverter extends Converter {
    convert (input: Buffer): JtsDocument {
        const series1 = new TimeSeries({ name: 'sn', type: 'TEXT' })
        const series2 = new TimeSeries({ name: 'pm1', type: 'NUMBER' })
        const series3 = new TimeSeries({ name: 'pm25', type: 'NUMBER' })
        const series4 = new TimeSeries({ name: 'pm10', type: 'NUMBER' })
        const series5 = new TimeSeries({ name: 'tsp', type: 'NUMBER' })
        const series6 = new TimeSeries({ name: 'rh', type: 'NUMBER' })
        const series7 = new TimeSeries({ name: 'temp', type: 'NUMBER' })
        const series8 = new TimeSeries({ name: 'ws', type: 'NUMBER' })
        const series9 = new TimeSeries({ name: 'wd', type: 'NUMBER' })

        // Get the records
        const records = JSON.parse(input.toString())

        // Iterate over each record and convert to eagle-io's format
        records.data.forEach((row: {timestamp: string, sn: string, pm1: string, 
                        pm25: string, pm10: string, tsp: string,  
                        met: { rh: string, temp: string, ws: string, wd: string } }) => {

            const ts = new Date(row.timestamp)

            series1.insert({ timestamp: ts, value: row.sn })
            series2.insert({ timestamp: ts, value: Number(row.pm1) })
            series3.insert({ timestamp: ts, value: Number(row.pm25) })
            series4.insert({ timestamp: ts, value: Number(row.pm10) })
            series5.insert({ timestamp: ts, value: Number(row.tsp) })
            series6.insert({ timestamp: ts, value: Number(row.met.rh) })
            series7.insert({ timestamp: ts, value: Number(row.met.temp) })
            series8.insert({ timestamp: ts, value: Number(row.met.ws) })
            series9.insert({ timestamp: ts, value: Number(row.met.wd) })
        })

        return new JtsDocument({ series: [series1, series2, series3, series4, series5, series6, series7, series8, series9] })
    }
}