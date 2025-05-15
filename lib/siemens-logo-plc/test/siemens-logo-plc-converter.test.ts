import * as fs from 'fs'
import * as path from 'path'
import { SiemensLogoPlcConverter } from '../siemens-logo-plc-converter'

describe('LogoPlcConverter Unit Test', () => {
  it('should correctly convert the input.dat file and validate values', () => {
    const converter = new SiemensLogoPlcConverter()
    const filePath = path.join('lib/siemens-logo-plc/test/input.dat') // Path to the renamed input file
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
})
