import * as fs from 'fs'
import { SampleWithZoneConverter } from '../sample-with-zone-converter'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import tz from 'dayjs/plugin/timezone'
beforeAll(() => {
  dayjs.extend(utc)
  dayjs.extend(tz)
})
describe('Unit test for sample converter', function () {
  it('converts sample file', async () => {
    const converter = new SampleWithZoneConverter()
    const buff = fs.readFileSync('lib/sample/test/input.dat')
    const timezone = 'Australia/Sydney'
    const result = converter.convert(buff, timezone)

    expect(result.series[0].first.timestamp).toEqual(dayjs.tz('2022-09-01T14:01:01', timezone).toDate())
    expect(result.series[0].values).toEqual([3.5, 5.7, 7.8])
    expect(result.series[1].values).toEqual(['apple', 'banana', 'melon'])
    expect(result.series[2].values).toEqual(['true', 'false', 'true'])
  })
})
