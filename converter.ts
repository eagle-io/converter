import { JtsDocument } from '@eagle-io/timeseries'

export abstract class Converter {
  abstract convert (input: Buffer): JtsDocument
}
