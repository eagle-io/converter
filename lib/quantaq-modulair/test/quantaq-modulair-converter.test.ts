import * as fs from 'fs'
import { QuantAQModulairConverter } from '../quantaq-modulair-converter'

describe('Unit test for QuantAQ MODULAIR Sensors', function () {
    it('converts sample file', async() => {
        const converter = new QuantAQModulairConverter()

        const buff = fs.readFileSync('lib/quantaq-modulair/test/input.dat')
        const result = converter.convert(buff)

        expect(result.series[0].values).toEqual([])
    })
})