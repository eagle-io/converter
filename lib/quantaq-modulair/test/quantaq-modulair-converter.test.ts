import * as fs from 'fs'
import { QuantAQModulairConverter } from '../quantaq-modulair-converter'

describe('Unit test for SKU=000 QuantAQ MODULAIR Sensors', function () {
  it('converts sample file', async () => {
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

    // Check the NO data
    expect(result.series[9].values).toEqual([NaN, NaN, NaN])

    // Check the NO2 data
    expect(result.series[10].values).toEqual([NaN, NaN, NaN])

    // Check the O3 data
    expect(result.series[11].values).toEqual([NaN, NaN, NaN])

    // Check the CO data
    expect(result.series[12].values).toEqual([NaN, NaN, NaN])

    // Check the CO2 data
    expect(result.series[13].values).toEqual([NaN, NaN, NaN])
  })
})

// Run unit tests for a SKU=000 with no TSP model
describe('Unit test for SKU=000 QuantAQ MODULAIR Sensor without TSP enabled', function () {
  it('converts sample file', async () => {
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

    // Check the NO data
    expect(result.series[9].values).toEqual([NaN, NaN, NaN])

    // Check the NO2 data
    expect(result.series[10].values).toEqual([NaN, NaN, NaN])

    // Check the O3 data
    expect(result.series[11].values).toEqual([NaN, NaN, NaN])

    // Check the CO data
    expect(result.series[12].values).toEqual([NaN, NaN, NaN])

    // Check the CO2 data
    expect(result.series[13].values).toEqual([NaN, NaN, NaN])
  })
})

// Run unit tests for a SKU=015 with no TSP model
describe('Unit test for SKU=015 QuantAQ MODULAIR Sensor without TSP enabled', function () {
  it('converts sample file', async () => {
    const converter = new QuantAQModulairConverter()
    const buff = fs.readFileSync('lib/quantaq-modulair/test/input-3.dat')
    const result = converter.convert(buff)

    // Check the serial number
    expect(result.series[0].values).toEqual(['MOD-RND-2', 'MOD-RND-2', 'MOD-RND-2'])

    // Check the PM1 data
    expect(result.series[1].values).toEqual([0.03, NaN, 0.08])

    // Check the PM2.5 data
    expect(result.series[2].values).toEqual([0.2, NaN, 0.18])

    // Check the PM10 data
    expect(result.series[3].values).toEqual([1.69, NaN, 0.34])

    // Check the TSP data
    expect(result.series[4].values).toEqual([NaN, NaN, NaN])

    // Check the RH data
    expect(result.series[5].values).toEqual([37.5, 37.6, 37.5])

    // Check the Temp data
    expect(result.series[6].values).toEqual([16.2, 16.2, 16.2])

    // Check the WS data
    expect(result.series[7].values).toEqual([0, 0, 0])

    // Check the WD data
    expect(result.series[8].values).toEqual([0, 0, 0])

    // Check the NO data
    expect(result.series[9].values).toEqual([6.82, 6.75, 6.16])

    // Check the NO2 data
    expect(result.series[10].values).toEqual([9.77, 9.54, 9.77])

    // Check the O3 data
    expect(result.series[11].values).toEqual([14.8, 15.65, 15.39])

    // Check the CO data
    expect(result.series[12].values).toEqual([487.53, 487.05, 473.16])

    // Check the CO2 data
    expect(result.series[13].values).toEqual([NaN, NaN, NaN])
  })
})
