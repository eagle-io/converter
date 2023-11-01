import * as fs from 'fs'
import { AcoemFusionConverter } from '../acoem-fusion-converter'

describe('Unit test for acoem fusion converter', function () {
  it('converts sample file', async () => {
    const converter = new AcoemFusionConverter()
    const buff = fs.readFileSync('lib/acoem-fusion/test/input.dat')
    const result = converter.convert(buff)

    expect(result.series[0].first.timestamp).toEqual(new Date('2012-01-04T22:01:01Z'))
    expect(result.series[0].values).toEqual([10.0])
    expect(result.series[1].values).toEqual([12.0])
    expect(result.series[2].values).toEqual([0.0])
    expect(result.series[3].values).toEqual([1000])
    expect(result.series[4].values).toEqual([34.0])
    expect(result.series[5].values).toEqual([54.0])
  })
})
