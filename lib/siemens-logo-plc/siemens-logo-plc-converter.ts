import { JtsDocument, TimeSeries } from '@eagle-io/timeseries'
import { Converter } from '../../converter'

interface ReportedValue {
  value: number | number[] | undefined
}

export class SiemensLogoPlcConverter extends Converter {
  private readonly DATA_TYPE = 'NUMBER'

  convert (input: Buffer): JtsDocument {
    try {
      const payload = JSON.parse(input.toString())
      const reported = payload?.state?.reported

      // Handle empty messages
      if (!reported || typeof reported !== 'object') {
        return this.createDummyDocument() // Generate a dummy JTS output
      }

      const timestamp = new Date(new Date().toISOString()) // Server UTC time

      const seriesList: TimeSeries<number>[] = []
      let recordCount = 0 // Counter to track the number of records added

      for (const [key, value] of Object.entries(reported)) {
        if (key === '$logotime' || typeof value !== 'object' || value === null) continue

        const pointValue = this.extractPointValue(value as ReportedValue)
        if (pointValue === undefined) continue

        // Add data to seriesList
        seriesList.push({
          name: key, // Required field from BaseTimeSeries
          type: this.DATA_TYPE, // Required field from BaseTimeSeries
          records: [
            {
              timestamp,
              value: pointValue
            }
          ]
        } as TimeSeries<number>) // Type assertion to satisfy TypeScript
        recordCount++ // Increment the record count
      }

      // If no records were added, return a dummy document
      if (recordCount === 0) {
        return this.createDummyDocument()
      }

      return new JtsDocument({ series: seriesList })
    } catch (error) {
      return this.createErrorDocument(error) // Handle errors
    }
  }

  private extractPointValue (value: ReportedValue): number | undefined {
    if (!('value' in value)) return undefined
    const val = value.value
    return Array.isArray(val) ? val[0] : typeof val === 'number' ? val : undefined
  }

  // Generate a dummy JTS output for empty messages
  private createDummyDocument (): JtsDocument {
    const seriesList: TimeSeries<string>[] = []

    seriesList.push({
      name: 'converter', // Required field from BaseTimeSeries
      type: 'TEXT', // Required field from BaseTimeSeries
      records: [
        {
          timestamp: new Date('2025-01-01T00:00:00Z'), // Fixed timestamp
          value: 'Ok' // Dummy numeric value to satisfy TimeSeries<number>
        }
      ]
    } as TimeSeries<string>) // Type assertion to satisfy TypeScript

    return new JtsDocument({ series: seriesList })
  }

  // Generate a JTS output for error messages
  private createErrorDocument (error: unknown): JtsDocument {
    const seriesList: TimeSeries<string>[] = []

    seriesList.push({
      name: 'error', // Required field from BaseTimeSeries
      type: 'TEXT', // Required field from BaseTimeSeries
      records: [
        {
          timestamp: new Date(), // Current timestamp
          value: error instanceof Error ? `Error ${error.message}` : 'Error Unknown error' // Prefix error message with "Error "
        }
      ]
    } as TimeSeries<string>) // Type assertion to satisfy TimeSeries<string>

    return new JtsDocument({ series: seriesList })
  }
}
