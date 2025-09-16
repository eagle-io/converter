import { JtsDocument, TimeSeries } from '@eagle-io/timeseries'
import { Converter } from '../../converter'

/**
 * Convert the output from QuantAQ's RESTful API for the MODULAIR-X and MODULAIR-X-PM
 * product. Note: MODULAIR-X-UFP is not yet supported.
 *
 * Docs: https://docs.quant-aq.com/api
 */
export class QuantAQModulairXConverter extends Converter {
  convert (input: Buffer): JtsDocument {
    const snSeries = new TimeSeries({ name: 'sn', type: 'TEXT' })

    // pm data
    const pm1Series = new TimeSeries({ name: 'pm1', type: 'NUMBER' })
    const pm25Series = new TimeSeries({ name: 'pm25', type: 'NUMBER' })
    const pm10Series = new TimeSeries({ name: 'pm10', type: 'NUMBER' })
    const tspSeries = new TimeSeries({ name: 'tsp', type: 'NUMBER' })

    // gas data
    const noSeries = new TimeSeries({ name: 'no', type: 'NUMBER' })
    const no2Series = new TimeSeries({ name: 'no2', type: 'NUMBER' })
    const o3Series = new TimeSeries({ name: 'o3', type: 'NUMBER' })
    const coSeries = new TimeSeries({ name: 'co', type: 'NUMBER' })

    // weather station data
    const wsSeries = new TimeSeries({ name: 'wx_ws', type: 'NUMBER' })
    const wdSeries = new TimeSeries({ name: 'wx_wd', type: 'NUMBER' })
    const wsScalarSeries = new TimeSeries({ name: 'wx_ws_scalar', type: 'NUMBER' })
    const uSeries = new TimeSeries({ name: 'wx_u', type: 'NUMBER' })
    const vSeries = new TimeSeries({ name: 'wx_v', type: 'NUMBER' })
    const pressureSeries = new TimeSeries({ name: 'wx_pressure', type: 'NUMBER' })
    const tempSeries = new TimeSeries({ name: 'wx_temp', type: 'NUMBER' })
    const rhSeries = new TimeSeries({ name: 'wx_rh', type: 'NUMBER' })
    const dewPointSeries = new TimeSeries({ name: 'wx_dew_point', type: 'NUMBER' })

    // Get the records
    const records = JSON.parse(input.toString())

    // Iterate over each record and convert to eagle-io's format
    records.data.forEach(
      (row: {
        timestamp: string;
        sn: string;
        pm1: string;
        pm25: string;
        pm10: string;
        tsp: string;
        no: string;
        no2: string;
        o3: string;
        co: string;
        met: { wx_ws: string; wx_wd: string; wx_ws_scalar: string; wx_u: string; wx_v: string; wx_pressure: string; wx_temp: string; wx_rh: string; wx_dew_point: string; };
      }) => {
        const ts = this.dayjs.tz(row.timestamp, 'UTC')

        snSeries.insert({ timestamp: ts.toDate(), value: row.sn })

        pm1Series.insert({ timestamp: ts.toDate(), value: parseFloat(row.pm1) })
        pm25Series.insert({ timestamp: ts.toDate(), value: parseFloat(row.pm25) })
        pm10Series.insert({ timestamp: ts.toDate(), value: parseFloat(row.pm10) })
        tspSeries.insert({ timestamp: ts.toDate(), value: parseFloat(row.tsp) })

        // these will not always be present (even though types indicate they are), but we
        // want them to be NaN, so it's ok.
        noSeries.insert({ timestamp: ts.toDate(), value: parseFloat(row.no) })
        no2Series.insert({ timestamp: ts.toDate(), value: parseFloat(row.no2) })
        o3Series.insert({ timestamp: ts.toDate(), value: parseFloat(row.o3) })
        coSeries.insert({ timestamp: ts.toDate(), value: parseFloat(row.co) })

        // note again these will not always be present.
        // (more precisely: "met" will not always be present, though all keys under it should
        // be present if it is.)
        // because the values are nested we need the ? accessors.
        wsSeries.insert({ timestamp: ts.toDate(), value: parseFloat(row.met?.wx_ws) })
        wdSeries.insert({ timestamp: ts.toDate(), value: parseFloat(row.met?.wx_wd) })
        wsScalarSeries.insert({ timestamp: ts.toDate(), value: parseFloat(row.met?.wx_ws_scalar) })
        uSeries.insert({ timestamp: ts.toDate(), value: parseFloat(row.met?.wx_u) })
        vSeries.insert({ timestamp: ts.toDate(), value: parseFloat(row.met?.wx_v) })
        pressureSeries.insert({ timestamp: ts.toDate(), value: parseFloat(row.met?.wx_pressure) })
        tempSeries.insert({ timestamp: ts.toDate(), value: parseFloat(row.met?.wx_temp) })
        rhSeries.insert({ timestamp: ts.toDate(), value: parseFloat(row.met?.wx_rh) })
        dewPointSeries.insert({ timestamp: ts.toDate(), value: parseFloat(row.met?.wx_dew_point) })
      }
    )

    return new JtsDocument({
      series: [
        snSeries,
        pm1Series,
        pm25Series,
        pm10Series,
        tspSeries,
        noSeries,
        no2Series,
        o3Series,
        coSeries,
        wsSeries,
        wdSeries,
        wsScalarSeries,
        uSeries,
        vSeries,
        pressureSeries,
        tempSeries,
        rhSeries,
        dewPointSeries
      ]
    })
  }
}
