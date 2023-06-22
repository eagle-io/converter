import * as fs from 'fs'
import { DaCortexJsonConverter } from '../dacortexjson-converter'

describe('Unit test for dacortexjson', function () {
  it('converts sample file', async () => {
    const converter = new DaCortexJsonConverter()
    const buff = fs.readFileSync('lib/dacortexjson/test/input.dat')
    const result = converter.convert(buff)

    expect(result.series[0].first.timestamp).toEqual(new Date('2023-05-23T07:26:00.921Z'))

    expect(result.series[0].values).toEqual([766.86])
    expect(result.series[0].name).toEqual('Absolute level')
    expect(result.series[0].type).toEqual('NUMBER')

    expect(result.series[1].values).toEqual([246.6])
    expect(result.series[1].name).toEqual('Conductivity')
    expect(result.series[1].first.timestamp).toEqual(new Date('2023-05-23T07:26:00.921Z'))

    expect(result.series[5].values).toEqual(['False'])
    expect(result.series[5].name).toEqual('Failure')
    expect(result.series[5].first.timestamp).toEqual(new Date('2023-05-23T07:26:00.921Z'))
  })
})
