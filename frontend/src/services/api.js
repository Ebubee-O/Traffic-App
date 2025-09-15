import axios from 'axios';
import { auth } from '../utils/auth';

const API_URL = 'https://yourusername.pythonanywhere.com/api';

const getAuthHeader = async () => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    return { Authorization: `Bearer ${token}` };
  }
  return {};
};

export const submitReport = async (report) => {
  const headers = await getAuthHeader();
  const response = await axios.post(`${API_URL}/reports`, report, { headers });
  return response.data;
};

export const getRecentReports = async () => {
  const headers = await getAuthHeader();
  const response = await axios.get(`${API_URL}/reports/recent`, { headers });
  return response.data;
};
