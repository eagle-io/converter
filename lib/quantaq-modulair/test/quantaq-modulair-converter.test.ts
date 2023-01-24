import * as fs from 'fs'
import { QuantAQModulairConverter } from '../quantaq-modulair-converter'

describe('Unit test for QuantAQ MODULAIR Sensors', function () {
    it('converts sample file', async() => {
        const converter = new QuantAQModulairConverter()

        const buff = fs.readFileSync('lib/quantaq-modulair/test/input.dat')
        const result = converter.convert(buff)

        // Check the serial number
        expect(result.series[0].values).toEqual(['MOD-00264', 'MOD-00264', 'MOD-00264'])

        // Check the PM1 data
        expect(result.series[1].values).toEqual([0.81, 0.57, 0.66])

        // Check the PM2.5 data
        expect(result.series[2].values).toEqual([1.01, 0.69, 0.76])

        // Check the PM10 data
        expect(result.series[3].values).toEqual([1.64, 0.79, 0.86])

        // Check the TSP data
        expect(result.series[4].values).toEqual([1.64, 0.79, 0.86])

        // Check the RH data
        expect(result.series[5].values).toEqual([18.6, 18.5, 18.5])

        // Check the Temp data
        expect(result.series[6].values).toEqual([21.8, 21.8, 21.8])

        // Check the WS data
        expect(result.series[7].values).toEqual([0, 0, 0])

        // Check the WD data
        expect(result.series[8].values).toEqual([0, 0, 0])
    })
})

// Run unit tests for a SKU=000 with no TSP model
describe('Unit test for QuantAQ MODULAIR Sensor without TSP enabled', function () {
    it('converts sample file', async() => {
        const converter = new QuantAQModulairConverter()

        const buff = fs.readFileSync('lib/quantaq-modulair/test/input-2.dat')
        const result = converter.convert(buff)

        // Check the serial number
        expect(result.series[0].values).toEqual(['MOD-00264', 'MOD-00264', 'MOD-00264'])

        // Check the PM1 data
        expect(result.series[1].values).toEqual([0.81, 0.57, 0.66])

        // Check the PM2.5 data
        expect(result.series[2].values).toEqual([1.01, 0.69, 0.76])

        // Check the PM10 data
        expect(result.series[3].values).toEqual([1.64, 0.79, 0.86])

        // Check the TSP data
        expect(result.series[4].values).toEqual([NaN, NaN, NaN])

        // Check the RH data
        expect(result.series[5].values).toEqual([18.6, 18.5, 18.5])

        // Check the Temp data
        expect(result.series[6].values).toEqual([21.8, 21.8, 21.8])

        // Check the WS data
        expect(result.series[7].values).toEqual([NaN, NaN, NaN])

        // Check the WD data
        expect(result.series[8].values).toEqual([NaN, NaN, NaN])
    })
})