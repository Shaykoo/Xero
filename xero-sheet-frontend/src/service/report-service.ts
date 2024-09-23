import axios from 'axios';
import { ReportResponse } from '../types/reportTypes';

const API_URL: string = process.env.REACT_APP_API_URL as string;

export const getReport = async (): Promise<ReportResponse> => {
  try {
    const response = await axios.get<ReportResponse>(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error in fetching report:', error);
    throw error;
  }
};
