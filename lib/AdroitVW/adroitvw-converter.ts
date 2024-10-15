import { JtsDocument, TimeSeries } from '@eagle-io/timeseries';
import { Converter } from '../../converter';

/**
 * Convert the JSON data from Adroit VW Logger
 * example: https://adroitplatform.com/api/points/34404/feeds/54553
 */
export class AdroitVWJsonConverter extends Converter {
  convert(input: Buffer): JtsDocument {
    const series1 = new TimeSeries({ name: 'frequency' });

    // Parse the input buffer to JSON object
    const record = JSON.parse(input.toString());

    // Convert the single frequency value to eagle-io's format
    //const timestamp = new Date(record.lastUpdate);  // using 'lastUpdate' as timestamp
	//const timestamp = new Date(record.lastUpdate * 1000).toLocaleString("en-NZ", { timeZone: "Pacific/Auckland" });
	const timestamp_ep = new Date(record.lastUpdate);
    const timestamp = new Date(timestamp_ep.getTime() + (12 * 60 * 60 * 1000)); 
    const value = Number(record.value);  // converting value to number

    // Insert the time series data
    series1.insert({ timestamp, value });

    // Return the JTS document
    return new JtsDocument({ series: [series1] });
  }
}

