import React from 'react';
import { submitReport } from '../services/api';

function ReportForm() {
  const [report, setReport] = React.useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (report) {
      try {
        await submitReport({ text: report });
        setReport('');
      } catch (error) {
        alert(error.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={report} onChange={(e) => setReport(e.target.value)} placeholder="Submit traffic/road update" required />
      <button type="submit">Submit</button>
    </form>
  );
}

export default ReportForm;
