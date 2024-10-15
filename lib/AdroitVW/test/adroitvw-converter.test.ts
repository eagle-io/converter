import * as fs from 'fs'
import { AdroitVWJsonConverter } from '../AdroitVW-converter'

describe('Unit test for AdroitVWJson', function () {
  it('converts sample file', async () => {
    const converter = new AdroitVWJsonConverter()
    const buff = fs.readFileSync('lib/AdroitVW/test/input.dat')
    const result = converter.convert(buff)

    // Corrected quotes and numeric timestamp for lastUpdate
    expect(result.series[0].first.timestamp).toEqual(new Date('2024-09-16T08:00:00Z'))
    expect(result.series[0].values).toEqual([2928.3])

  })
})



