import * as fs from 'fs'
import { DASCaptisV2Converter } from '../das-captis-v2-converter'

describe('Unit test for Captis converter', function () {
  it('converts captis file', async () => {
    const converter = new DASCaptisV2Converter()
    const buff = fs.readFileSync('lib/das-captis-v2/test/input.dat')
    const result = converter.convert(buff)

    expect(result.series.length).toBeGreaterThanOrEqual(4)

    const eventSeries = result.series.find(s => s.name === 'Event')
    const modbusSeries = result.series.find(s => s.name === 'Modbus_flow')
    const l002Series = result.series.find(s => s.name === 'l002')
    const radioSeries = result.series.find(s => s.name === 'radio')

    expect(eventSeries).toBeDefined()
    expect(modbusSeries).toBeDefined()
    expect(l002Series).toBeDefined()
    expect(radioSeries).toBeDefined()

    if (modbusSeries) {
      expect(modbusSeries.first.value).toEqual(3145728.0)
      expect(modbusSeries.first.timestamp).toEqual(new Date('2019-09-17T03:51:01Z'))
    }

    if (l002Series) {
      expect(l002Series.first.timestamp).toEqual(new Date('2019-08-05T07:02:00Z'))
      expect(l002Series.first.value).toEqual(1.0)
    }

    if (radioSeries) {
      const radioValues = radioSeries.values.filter(v => v === -94)
      expect(radioValues.length).toBeGreaterThan(0)
    }
  })
})
