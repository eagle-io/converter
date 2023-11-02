import * as fs from 'fs'
import { AcoemFusionConverter } from '../acoem-fusion-converter'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import tz from 'dayjs/plugin/timezone'
beforeAll(() => {
  dayjs.extend(utc)
  dayjs.extend(tz)
})

describe('Unit test for acoem fusion converter', function () {
  it('converts sample file', async () => {
    const converter = new AcoemFusionConverter()
    const buff = fs.readFileSync('lib/acoem-fusion/test/input.dat')
    const timezone = 'Australia/Brisbane'
    const result = converter.convert(buff, timezone)

    expect(result.series[0].first.timestamp).toEqual(dayjs.tz('2012-01-04T22:01:01', timezone).toDate())
    expect(result.series[0].values).toEqual([40.0])
    expect(result.series[1].values).toEqual([41.0])
    expect(result.series[2].values).toEqual([41.0])
    expect(result.series[3].values).toEqual([40.0])
    expect(result.series[4].values).toEqual([41.0])
    expect(result.series[5].values).toEqual([41.0])
    expect(result.series[6].values).toEqual([41.0])
    expect(result.series[7].values).toEqual([41.0])
    expect(result.series[8].values).toEqual([41.0])
    expect(result.series[9].values).toEqual([41.0])
    expect(result.series[10].values).toEqual([41.0])
    expect(result.series[11].values).toEqual([41.0])
    expect(result.series[12].values).toEqual([41.0])
    expect(result.series[13].values).toEqual([41.0])
    expect(result.series[14].values).toEqual([41.0])
    expect(result.series[15].values).toEqual([40.0]) // all data included in sample payload
    expect(result.series[16].values).toEqual([41.0]) // payload example from sensor documentation. Can send but the docs aren't public
    expect(result.series[17].values).toEqual([41.0])
    expect(result.series[18].values).toEqual([41.0])
    expect(result.series[19].values).toEqual([41.0])
    expect(result.series[20].values).toEqual([41.0])
    expect(result.series[21].values).toEqual([41.0])
    expect(result.series[22].values).toEqual([41.0])
    expect(result.series[23].values).toEqual([41.0])
    expect(result.series[24].values).toEqual([41.0])
    expect(result.series[25].values).toEqual([41.0])
    expect(result.series[26].values).toEqual([41.0])
    expect(result.series[27].values).toEqual([10.0])
    expect(result.series[28].values).toEqual([12.0])
    expect(result.series[29].values).toEqual([0.0])
    expect(result.series[30].values).toEqual([1000.0])
    expect(result.series[31].values).toEqual([34.0])
    expect(result.series[32].values).toEqual([54.0])
  })
})
