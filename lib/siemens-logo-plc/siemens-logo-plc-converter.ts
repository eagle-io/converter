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

      if (!reported || typeof reported !== 'object') {
        return new JtsDocument({ series: [] }) // No valid data to process
      }

      const timestamp = new Date(new Date().toISOString()) // Server UTC time

      const seriesList: TimeSeries<number>[] = []

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
      }

      return new JtsDocument({ series: seriesList })
    } catch (error) {
      return this.createErrorDocument(error)
    }
  }

  private extractPointValue (value: ReportedValue): number | undefined {
    if (!('value' in value)) return undefined
    const val = value.value
    return Array.isArray(val) ? val[0] : typeof val === 'number' ? val : undefined
  }

  private createErrorDocument (error: unknown): JtsDocument {
    console.error('Conversion error:', error instanceof Error ? error.message : 'Unknown error')
    return new JtsDocument({ series: [] })
  }
}
