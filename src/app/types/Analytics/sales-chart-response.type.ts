import {SalesSeriesItem} from './sales-series-item';

export interface SalesChartResponse {
  dates: string[];
  series: SalesSeriesItem[];
}
