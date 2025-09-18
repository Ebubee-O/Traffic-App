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
        alert('Report submitted!');
      } catch (error) {
        alert(error.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 mb-4">
      <input
        type="text"
        value={report}
        onChange={(e) => setReport(e.target.value)}
        placeholder="Submit traffic update (e.g., Traffic at Ifite gate)"
        className="flex-1 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        required
      />
      <button
        type="submit"
        className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
      >
        Submit
      </button>
    </form>
  );
}

export default ReportForm;
