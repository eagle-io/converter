import * as fs from 'fs'
import { SyscomVibrationConverter } from '../syscom-vibration-converter'

describe('Unit test for Aecom Vibration converter', function () {
  it('converts sample file', async () => {
    const converter = new SyscomVibrationConverter()
    const buff = fs.readFileSync('lib/syscom-vibration/test/input.dat')
    const result = converter.convert(buff)

    expect(result.series.length).toEqual(4)

    expect(result.series[0].values).toEqual([0.0341325, 0.0341326, 0.0341327])
    expect(result.series[0].name).toEqual('VM Peak X')
    expect(result.series[0].first.timestamp).toEqual(new Date('2023-01-25 10:03:46.625996'))
    expect(result.series[0].last.timestamp).toEqual(new Date('2023-01-25 10:06:46.625996'))

    expect(result.series[3].values).toEqual([0.0370401, 0.0370407, 0.0370406])
    expect(result.series[3].name).toEqual('VM VSum (X,Y,Z)')
    expect(result.series[3].first.timestamp).toEqual(new Date('2023-01-25 10:03:46.625996'))
    expect(result.series[3].last.timestamp).toEqual(new Date('2023-01-25 10:06:46.625996'))
  })
})
