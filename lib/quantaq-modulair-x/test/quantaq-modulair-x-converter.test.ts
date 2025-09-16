import * as fs from 'fs'
import { QuantAQModulairXConverter } from '../quantaq-modulair-x-converter'

describe('Unit test for QuantAQ MODULAIR Series X Sensors', function () {
  it('converts full MOD-X data', async () => {
    const converter = new QuantAQModulairXConverter()
    const buff = fs.readFileSync('lib/quantaq-modulair-x/test/mod-x-with-met.dat')
    const result = converter.convert(buff)

    // two things:
    // 1) there's supposed to be a property .timestamps, but doesn't seem to actually exist: https://github.com/eagle-io/timeseries-ts/issues/3
    // 2) note the Z on the Dates here. this is a helpful test, because our data
    //    doesn't have that Z on it, so we should be explicit about the UTC tz in the code.
    //    NOTE: we don't seem to have done this properly for the earlier non-X series code...
    expect(result.series[0].records.map((record) => record.timestamp)).toEqual([
      new Date('2025-04-03T16:39:18Z'),
      new Date('2025-04-07T04:02:47Z'),
      new Date('2025-04-08T14:06:03Z')
    ])

    // Check the serial number
    expect(result.series[0].values).toEqual(['MOD-X-00891', 'MOD-X-00891', 'MOD-X-00891'])

    // Check the PM1 data
    expect(result.series[1].values).toEqual([1.02, 0.07, 0.47])

    // Check the PM2.5 data
    expect(result.series[2].values).toEqual([3.03, 0.72, 1.02])

    // Check the PM10 data
    expect(result.series[3].values).toEqual([28.56, 24.62, 18.82])

    // Check the TSP data
    expect(result.series[4].values).toEqual([73.63, 24.62, 18.82])

    // Check the NO data
    expect(result.series[5].values).toEqual([0.49, 4.57, -1.05])

    // Check the NO2 data
    expect(result.series[6].values).toEqual([49.08, 27.98, 34.58])

    // Check the O3 data
    expect(result.series[7].values).toEqual([9.4, 7.46, 4.03])

    // Check the CO data
    expect(result.series[8].values).toEqual([387.38, 186.64, 267.43])

    // Check the wx_ws data
    expect(result.series[9].values).toEqual([0.95, 1.6, 1.04])

    // Check the wx_wd data
    expect(result.series[10].values).toEqual([289.55, 335.54, 76.64])

    // Check the wx_ws_scalar data
    expect(result.series[11].values).toEqual([1.08, 1.67, 1.16])

    // Check the wx_u data
    expect(result.series[12].values).toEqual([-0.892, -0.661, 1.016])

    // Check the wx_v data
    expect(result.series[13].values).toEqual([0.317, 1.453, 0.241])

    // Check the wx_pressure data
    expect(result.series[14].values).toEqual([1014.4, 1009.1, 998.73])

    // Check the wx_temp data
    expect(result.series[15].values).toEqual([9.89, 9.59, 4.57])

    // Check the wx_rh data
    expect(result.series[16].values).toEqual([91.19, 60, 87.6])

    // Check the wx_dew_point data
    expect(result.series[17].values).toEqual([8.53, 2.21, 2.68])
  })

  it('converts MOD-X data with null met and assorted elsewhere entries', async () => {
    // most of this data is as above, but with a met data nulled and a couple other fields
    // nulled just to test NaN-ifying.
    const converter = new QuantAQModulairXConverter()
    const buff = fs.readFileSync('lib/quantaq-modulair-x/test/mod-x-with-null-met.dat')
    const result = converter.convert(buff)

    // Check the serial number
    expect(result.series[0].values).toEqual(['MOD-X-00891', 'MOD-X-00891', 'MOD-X-00891'])

    // Check the PM1 data
    expect(result.series[1].values).toEqual([NaN, 0.07, 0.47])

    // Check the CO data
    expect(result.series[8].values).toEqual([387.38, 186.64, NaN])

    // Check the wx_ws data
    expect(result.series[9].values).toEqual([NaN, NaN, NaN])

    // Check the wx_wd data
    expect(result.series[10].values).toEqual([NaN, NaN, NaN])

    // Check the wx_ws_scalar data
    expect(result.series[11].values).toEqual([NaN, NaN, NaN])

    // Check the wx_u data
    expect(result.series[12].values).toEqual([NaN, NaN, NaN])

    // Check the wx_v data
    expect(result.series[13].values).toEqual([NaN, NaN, NaN])

    // Check the wx_pressure data
    expect(result.series[14].values).toEqual([NaN, NaN, NaN])

    // Check the wx_temp data
    expect(result.series[15].values).toEqual([NaN, NaN, NaN])

    // Check the wx_rh data
    expect(result.series[16].values).toEqual([NaN, NaN, NaN])

    // Check the wx_dew_point data
    expect(result.series[17].values).toEqual([NaN, NaN, NaN])
  })

  it('converts MOD-X-PM data (no met, no keys for gases)', async () => {
    // MOD-X-PM can have fully missing met entry, but we should handle it gracefully with NaNs.
    // (it can also have the met entry, but testing that is handled above).
    // and of course it won't have gas entries, which we should also handle gracefully.
    const converter = new QuantAQModulairXConverter()
    const buff = fs.readFileSync('lib/quantaq-modulair-x/test/mod-x-pm.dat')
    const result = converter.convert(buff)

    // different SN from above
    expect(result.series[0].values).toEqual(['MOD-X-PM-00892', 'MOD-X-PM-00892', 'MOD-X-PM-00892'])

    // these PM entries are the same as original MOD-X data.

    // Check the PM1 data
    expect(result.series[1].values).toEqual([1.02, 0.07, 0.47])

    // Check the PM2.5 data
    expect(result.series[2].values).toEqual([3.03, 0.72, 1.02])

    // Check the PM10 data
    expect(result.series[3].values).toEqual([28.56, 24.62, 18.82])

    // Check the TSP data
    expect(result.series[4].values).toEqual([73.63, 24.62, 18.82])

    // everything here down is NaN

    // Check the NO data
    expect(result.series[5].values).toEqual([NaN, NaN, NaN])

    // Check the NO2 data
    expect(result.series[6].values).toEqual([NaN, NaN, NaN])

    // Check the O3 data
    expect(result.series[7].values).toEqual([NaN, NaN, NaN])

    // Check the CO data
    expect(result.series[8].values).toEqual([NaN, NaN, NaN])

    // Check the wx_ws data
    expect(result.series[9].values).toEqual([NaN, NaN, NaN])

    // Check the wx_wd data
    expect(result.series[10].values).toEqual([NaN, NaN, NaN])

    // Check the wx_ws_scalar data
    expect(result.series[11].values).toEqual([NaN, NaN, NaN])

    // Check the wx_u data
    expect(result.series[12].values).toEqual([NaN, NaN, NaN])

    // Check the wx_v data
    expect(result.series[13].values).toEqual([NaN, NaN, NaN])

    // Check the wx_pressure data
    expect(result.series[14].values).toEqual([NaN, NaN, NaN])

    // Check the wx_temp data
    expect(result.series[15].values).toEqual([NaN, NaN, NaN])

    // Check the wx_rh data
    expect(result.series[16].values).toEqual([NaN, NaN, NaN])

    // Check the wx_dew_point data
    expect(result.series[17].values).toEqual([NaN, NaN, NaN])
  })
})
