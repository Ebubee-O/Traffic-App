import axios from 'axios';
import { getToken } from '../utils/auth';

const API_URL = 'https://tradingwithkings.pythonanywhere.com/api';

const getAuthHeader = () => {
  const token = getToken();
  if (token) {
    return { Authorization: `Bearer ${token}` };
  }
  return {};
};

export const submitReport = async (report) => {
  const headers = getAuthHeader();
  const response = await axios.post(`${API_URL}/reports`, report, { headers });
  return response.data;
};

export const getRecentReports = async () => {
  const headers = getAuthHeader();
  const response = await axios.get(`${API_URL}/reports/recent`, { headers });
  return response.data;
};
