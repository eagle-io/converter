import * as fs from 'fs'
import * as path from 'path'
import { LogoPlcConverter } from '../siemens-logo-plc-converter'

describe('SiemensLogoPlcConverter Unit Tests for All Input Files', () => {
  const converter = new LogoPlcConverter()
  const testFolder = path.join(__dirname) // Path to the test folder
  const inputFiles = ['input-data1', 'input-data2', 'input-data3', 'input-data4'] // List of input files

  inputFiles.forEach((fileName) => {
    it(`should correctly convert the file: ${fileName}`, () => {
      const filePath = path.join(testFolder, fileName) // Path to the input file
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

      // Validate the columns
      Object.values(result.header?.columns || []).forEach((column: any) => {
        expect(column).toHaveProperty('name')
        expect(column).toHaveProperty('dataType', 'NUMBER')
      })

      // Validate the data
      result.data.forEach((dataEntry: any) => {
        expect(dataEntry).toHaveProperty('ts')
        expect(dataEntry).toHaveProperty('f')
        Object.values(dataEntry.f).forEach((field: any) => {
          expect(field).toHaveProperty('v')
        })
      })
    })
  })
})
