import * as fs from 'fs'
import { CubeNoiseConverter } from '../cube-noise-converter'

describe('Unit test for Cube Noise converter', function () {
  it('converts sample file', async () => {
    const converter = new CubeNoiseConverter()
    const buff = fs.readFileSync('lib/cube-noise/test/input.dat')
    const result = converter.convert(buff)

    expect(result.series.length).toEqual(22)

    expect(result.series[0].values).toEqual([22.3, 21.6, 21.3, 21.8])
    expect(result.series[0].name).toEqual('LAeq')
    expect(result.series[0].first.timestamp).toEqual(new Date('2023/01/08 00:00:00'))

    expect(result.series[1].values).toEqual([55.7, 51.9, 51.7, 55.2])
    expect(result.series[1].name).toEqual('LCpeak')
    expect(result.series[1].last.timestamp).toEqual(new Date('2023/01/08 00:00:03'))

    expect(result.series[18].values[0]).toEqual("12∞ 27' 59.20 S")
  })
})
