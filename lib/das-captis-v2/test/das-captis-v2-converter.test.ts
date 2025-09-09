import * as fs from 'fs'
import { DASCaptisV2Converter } from '../das-captis-v2-converter'

describe('Unit test for Captis converter', function () {
  it('converts captis file', async () => {
    const converter = new DASCaptisV2Converter()
    const buff = fs.readFileSync('lib/das-captis-v2/test/input.dat')
    const result = converter.convert(buff)

    expect(result.series.length).toEqual(6)

    const eventSeries = result.series.find(s => s.name === 'eventCode + eventNotes')
    const batterySeries = result.series.find(s => s.name === 'battery')
    const signalStrengthSeries = result.series.find(s => s.name === 'signalStrength')
    const flowSeries = result.series.find(s => s.name === 'flow')
    const modbusFlow1Series = result.series.find(s => s.name === 'flow1')
    const modbusFlow2Series = result.series.find(s => s.name === 'flow2')

    expect(eventSeries).toBeDefined()
    expect(batterySeries).toBeDefined()
    expect(signalStrengthSeries).toBeDefined()
    expect(flowSeries).toBeDefined()
    expect(modbusFlow1Series).toBeDefined()
    expect(modbusFlow2Series).toBeDefined()

    if (batterySeries) {
      expect(batterySeries.first?.timestamp).toBeDefined()
      expect(batterySeries.first?.value).toEqual(3.58)
    }

    if (signalStrengthSeries) {
      expect(signalStrengthSeries.first?.timestamp).toBeDefined()
      expect(signalStrengthSeries.first?.value).toEqual(-94)
    }

    if (flowSeries) {
      expect(flowSeries.first?.timestamp).toEqual(new Date('2019-08-05T07:02:00Z'))
      expect(flowSeries.first?.value).toEqual(2.0)
      expect(flowSeries.values).toEqual([2.0, 4.0, 3145728.0, 3145729.0])
      expect(flowSeries.last?.timestamp).toEqual(new Date('2019-09-17T04:51:01Z'))
    }

    if (eventSeries) {
      expect(eventSeries.first?.timestamp).toEqual(new Date('2019-08-06T05:00:53Z'))
      expect(eventSeries.first?.value).toEqual('a00077-00008')
      expect(eventSeries.last?.value).toEqual('a00077-00009')
      expect(eventSeries.last?.timestamp).toEqual(new Date('2019-08-06T05:01:28Z'))
    }

    if (modbusFlow1Series) {
      expect(modbusFlow1Series.first?.timestamp).toEqual(new Date('2019-09-17T05:51:01Z'))
      expect(modbusFlow1Series.first?.value).toEqual(3145730.0)
    }

    if (modbusFlow2Series) {
      expect(modbusFlow2Series.first?.timestamp).toEqual(new Date('2019-09-17T06:51:01Z'))
      expect(modbusFlow2Series.first?.value).toEqual(3145731.0)
    }
  })
})
