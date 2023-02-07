import { JtsDocument } from '@eagle-io/timeseries'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import tz from 'dayjs/plugin/timezone'

export abstract class Converter {
  protected dayjs
  constructor () {
    this.dayjs = dayjs
    this.dayjs.extend(utc)
    this.dayjs.extend(tz)
  }

  abstract convert (input: Buffer, timezone: string): JtsDocument
}
