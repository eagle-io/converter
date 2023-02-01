import * as fs from 'fs'
import { AecomVibrationConverter } from '../aecom-vibration-converter'

describe('Unit test for Aecom Vibration converter', function () {
  it('converts sample file', async () => {
    const converter = new AecomVibrationConverter()
    const buff = fs.readFileSync('lib/aecom-vibration/test/input.dat')
    const result = converter.convert(buff)

    expect(result.series[0].values).toEqual([0.0370401, 0.0370407, 0.0370406])
    expect(result.series[0].first.timestamp).toEqual(new Date('2023-01-25 10:03:46.625996'))
    expect(result.series[0].last.timestamp).toEqual(new Date('2023-01-25 10:06:46.625996'))
  })
})
