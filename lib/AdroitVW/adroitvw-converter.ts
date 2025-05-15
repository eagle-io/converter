import { JtsDocument, TimeSeries } from '@eagle-io/timeseries';
import { Converter } from '../../converter';
import moment from 'moment-timezone';
 
/**
* Convert the JSON data from Adroit VW Logger
* example: https://adroitplatform.com/api/points/34404/feeds/54553
*/
export class AdroitVWJsonConverter extends Converter {
  convert(input: Buffer): JtsDocument {
  // Parse the input buffer to JSON object
    const record = JSON.parse(input.toString());
    // Convert the epoch time to a moment object
	let timestamp = moment.utc(record.lastUpdate).tz('Pacific/Auckland').toDate();
	
	 // Create a TimeSeries object
	const series1 = new TimeSeries({ name: record.name });

	// Convert the value to a number
    const value = Number(record.value);  
 
    // Insert the time series data
    series1.insert({ timestamp, value });
 
    // Return the JTS document
    return new JtsDocument({ series: [series1] });
  }
}

