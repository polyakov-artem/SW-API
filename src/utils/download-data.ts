import { AcceptedData } from './../../node_modules/export-to-csv/output/lib/types.d';
import { mkConfig, generateCsv, download } from 'export-to-csv';

export type TDownloadData = Array<{ [k: string]: AcceptedData; [k: number]: AcceptedData }>;

export const downloadData = async (filename: string, data: TDownloadData) => {
  const csvConfig = mkConfig({ useKeysAsHeaders: true, filename });
  const csv = generateCsv(csvConfig)(data);
  download(csvConfig)(csv);
};
