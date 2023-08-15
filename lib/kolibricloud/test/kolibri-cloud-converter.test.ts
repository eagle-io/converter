import * as fs from 'fs'
import { KolibriCloudConverter } from '../kolibri-cloud-converter'

describe('Unit test for kolibricloud', function () {
  it('converts sample file', async () => {
    const converter = new KolibriCloudConverter()
    const buff = fs.readFileSync('lib/kolibricloud/test/input.dat')
    const result = converter.convert(buff)

    expect(result.series[0].first.timestamp).toEqual(new Date('2023-08-07T04:00:03Z'))
    expect(result.series[0].values).toEqual([0.7246704, 0.7224579, 0.7204742, 0.7191925])
    expect(result.series[0].name).toEqual('PDP1PBARO')
    expect(result.series[0].type).toEqual('NUMBER')
  })
})
