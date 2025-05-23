import * as fs from 'fs'
import * as path from 'path'
import { SiemensLogoPlcConverter } from '../siemens-logo-plc-converter'

describe('LogoPlcConverter Unit Test', () => {
  const converter = new SiemensLogoPlcConverter()
  it('should correctly convert the input.dat file and validate values', () => {
    const filePath = path.join(__dirname, 'input.dat') // Path to the renamed input file
    const inputBuffer = fs.readFileSync(filePath) // Read the file as a buffer

    // Convert the input data
    const result = converter.convert(inputBuffer).toJSON()

    // Validate the output structure
    expect(result).toHaveProperty('docType', 'jts')
    expect(result).toHaveProperty('subType', 'TIMESERIES')
    expect(result).toHaveProperty('version', '1.0')
    expect(result).toHaveProperty('header')
    expect(result.header).toHaveProperty('columns')
    expect(result.header).toHaveProperty('startTime')
    expect(result.header).toHaveProperty('endTime')
    expect(result.header).toHaveProperty('recordCount')
    expect(result).toHaveProperty('data')

    // Hardcoded expected values for validation
    const expectedColumns = [
      'PumpModeAuto',
      'PumpModeMan',
      'Pump01Sel',
      'Pump02Sel',
      'Pump01Run',
      'Pump02Run',
      'Pump01Alarm',
      'Pump02Alarm',
      'Pump01TripFB',
      'Pump02TripFB',
      'BatteryLow',
      'LS002_LL',
      'LS003_HL',
      'LS004_HHL',
      'GenStart',
      'GenRunning',
      'GenFault',
      'GenLowFuel',
      'Strobe'
    ]

    const expectedData = {
      0: { v: 0 },
      1: { v: 0 },
      2: { v: 1 },
      3: { v: 0 },
      4: { v: 0 },
      5: { v: 0 },
      6: { v: 0 },
      7: { v: 0 },
      8: { v: 0 },
      9: { v: 0 },
      10: { v: 0 },
      11: { v: 0 },
      12: { v: 0 },
      13: { v: 1 },
      14: { v: 0 },
      15: { v: 0 },
      16: { v: 0 },
      17: { v: 0 },
      18: { v: 1 }
    }

    // Validate the columns
    expectedColumns.forEach((columnName, index) => {
      expect(result?.header?.columns[index]).toHaveProperty('name', columnName)
      expect(result?.header?.columns[index]).toHaveProperty('dataType', 'NUMBER')
    })

    // Validate the data
    expect(result.data[0]).toHaveProperty('ts')
    expect(result.data[0]).toHaveProperty('f')
    expect(result.data[0].f).toEqual(expectedData)

    // Validate the timestamp is within ~10 seconds of the system time
    const systemTime = new Date().getTime()
    const resultTime = new Date(result.data[0].ts).getTime()
    const timeDifference = Math.abs(systemTime - resultTime)

    expect(timeDifference).toBeLessThanOrEqual(10000) // Ensure the difference is within 10 seconds
  })

  it('should handle non-empty input objects with no records and generate dummy JTS output', () => {
    const jsonString = `{
      "state": {
        "reported": {
          "$logotime": 1746708821
        }
      }
    }`
    const input = Buffer.from(jsonString) // Empty message
    const result = converter.convert(input)
    // Validate the output structure for empty messages
    expect(result).toHaveProperty('series')
    expect(result.series.length).toBe(1)
    expect(result.series[0].name).toEqual('converter')
    expect(result.series[0].type).toEqual('TEXT')
    expect(result.series[0].records.length).toEqual(1)
    expect(result.series[0].records[0].timestamp.toISOString()).toEqual('2025-01-01T00:00:00.000Z')
    expect(result.series[0].records[0].value).toEqual('Ok') // Convert to string
  })

  it('should handle empty object and produce a dummy JTS output', () => {
    const input = Buffer.from('{}') // Empty message
    const result = converter.convert(input)
    // Validate the output structure for empty messages
    expect(result).toHaveProperty('series')
    expect(result.series.length).toBe(1)
    expect(result.series[0].name).toEqual('converter')
    expect(result.series[0].type).toEqual('TEXT')
    expect(result.series[0].records.length).toEqual(1)
    expect(result.series[0].records[0].timestamp.toISOString()).toEqual('2025-01-01T00:00:00.000Z')
    expect(result.series[0].records[0].value).toEqual('Ok') // Convert to string
  })

  it('should handle errors and produce an error JTS output', () => {
    const input = Buffer.from('{ invalid JSON }') // Invalid JSON
    const result = converter.convert(input)
    // Validate the output structure for error messages
    expect(result).toHaveProperty('series')
    expect(result.series.length).toBe(1)
    expect(result.series[0]).toHaveProperty('name', 'error')
    expect(result.series[0]).toHaveProperty('type', 'TEXT')
    expect(result.series[0].records.length).toEqual(1)

    // Validate the error message and timestamp
    const errorRecord = result.series[0].records[0]
    expect(errorRecord).toHaveProperty('value')
    expect(errorRecord.value).toContain('Error') // Ensure the error message starts with "Error"

    const systemTime = new Date().getTime()
    const resultTime = new Date(errorRecord.timestamp).getTime()
    const timeDifference = Math.abs(systemTime - resultTime)

    // Ensure the timestamp is within ~10 seconds of the system time
    expect(timeDifference).toBeLessThanOrEqual(10000)
  })
})
