import * as fs from 'fs'
import { daimgwjsonConverter } from '../daimgwjson-converter'

describe('Unit test for daIMGWjson', function () {
  it('converts sample file', async () => {
    const converter = new daimgwjsonConverter()
    const buff = fs.readFileSync('lib/daIMGWjson/test/input.dat')
    const result = converter.convert(buff)

    expect(result.series[0].first.timestamp).toEqual(new Date('2023-05-20T16:00:00Z'))
    expect(result.series[0].values).toEqual([1.2345, 3.456, 7.89])
  })
})

