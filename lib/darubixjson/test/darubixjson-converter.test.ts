import * as fs from 'fs'
import { DaRubixJsonConverter } from '../darubixjson-converter'

describe('Unit test for darubixjson', function () {
  it('converts sample file', async () => {
    const converter = new DaRubixJsonConverter()
    const buff = fs.readFileSync('lib/darubixjson/test/input.dat')
    const result = converter.convert(buff)

    expect(result.series[0].first.timestamp).toEqual(new Date('2025-03-20T07:30:21.101Z'))

    expect(result.series[0].values).toEqual([-150.0])
    expect(result.series[0].name).toEqual('waterlevel')
    expect(result.series[0].type).toEqual('NUMBER')

    expect(result.series[1].values).toEqual([0.0])
    expect(result.series[1].name).toEqual('temperature')
    expect(result.series[1].first.timestamp).toEqual(new Date('2025-03-20T07:30:21.101Z'))

    expect(result.series[2].values).toEqual([5000.0])
    expect(result.series[2].name).toEqual('pressure')
    expect(result.series[2].first.timestamp).toEqual(new Date('2025-03-20T07:30:21.101Z'))
  })
})
