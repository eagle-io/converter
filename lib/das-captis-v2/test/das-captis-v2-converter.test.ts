import * as fs from 'fs'
import { DASCaptisV2Converter } from '../das-captis-v2-converter'

describe('Unit test for Captis converter', function () {
  it('converts captis file', async () => {
    const converter = new DASCaptisV2Converter()
    const buff = fs.readFileSync('lib/das-captis-v2/test/input.dat')
    const result = converter.convert(buff)

    expect(result.series.length).toBeGreaterThanOrEqual(4)

    const eventSeries = result.series.find(s => s.name === 'eventCode + eventNotes')
    const batterySeries = result.series.find(s => s.name === 'battery')
    const signalStrengthSeries = result.series.find(s => s.name === 'signalStrength')
    const pulseSeries = result.series.find(s => s.name === 'flow')
    const modbusSeries = result.series.find(s => s.name === 'modbus_flow')
    const modbusFlow1Series = result.series.find(s => s.name === 'flow1')
    const modbusFlow2Series = result.series.find(s => s.name === 'flow2')

    expect(eventSeries).toBeDefined()
    expect(batterySeries).toBeDefined()
    expect(signalStrengthSeries).toBeDefined()
    expect(pulseSeries).toBeDefined()
    expect(modbusSeries).toBeDefined()
    expect(modbusFlow1Series).toBeDefined()
    expect(modbusFlow2Series).toBeDefined()

    if (batterySeries) {
      expect(batterySeries.first.timestamp).toBeDefined()
      expect(batterySeries.first.value).toEqual(3.58)
    }

    if (signalStrengthSeries) {
      expect(signalStrengthSeries.first.timestamp).toBeDefined()
      expect(signalStrengthSeries.first.value).toEqual(-94)
    }

    if (pulseSeries) {
      expect(pulseSeries.first.timestamp).toEqual(new Date('2019-08-05T07:02:00Z'))
      expect(pulseSeries.first.value).toEqual(2.0)
    }

    if (modbusSeries) {
      expect(modbusSeries.first.timestamp).toEqual(new Date('2019-09-17T03:51:01Z'))
      expect(modbusSeries.first.value).toEqual(3145728.0)
    }

    if (modbusFlow1Series) {
      expect(modbusFlow1Series.first.timestamp).toEqual(new Date('2019-09-17T05:51:01Z'))
      expect(modbusFlow1Series.first.value).toEqual(3145730.0)
    }

    if (modbusFlow2Series) {
      expect(modbusFlow2Series.first.timestamp).toEqual(new Date('2019-09-17T06:51:01Z'))
      expect(modbusFlow2Series.first.value).toEqual(3145731.0)
    }
  })
})
