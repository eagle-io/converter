import * as fs from 'fs'
import { DaImgwJsonConverter } from '../daimgwjson-converter'

describe('Unit test for daimgwjson', function () {
  it('converts sample file', async () => {
    const converter = new DaImgwJsonConverter()
    const buff = fs.readFileSync('lib/daimgwjson/test/input.dat')
    const result = converter.convert(buff)

    expect(result.series[0].first.timestamp).toEqual(new Date('2023-05-20T16:00:00Z'))
    expect(result.series[0].values).toEqual([1.2345, 3.456, 7.89])
  })
})
