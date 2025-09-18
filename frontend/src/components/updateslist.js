import React, { useEffect, useState } from 'react';
import { getRecentReports } from '../services/api';

function UpdatesList() {
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const reports = await getRecentReports();
        setUpdates(reports);
      } catch (error) {
        console.error(error);
      }
    };
    fetchReports();
  }, []);

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold text-blue-800 mb-4 text-center">Recent Updates</h3>
      {updates.length ? (
        updates.map(update => (
          <div key={update.id} className="p-3 bg-white rounded mb-2 shadow">
            <p className="text-gray-800">{update.text}</p>
            <p className="text-sm text-gray-500">{new Date(update.timestamp).toLocaleString()}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-600 text-center">No updates yet.</p>
      )}
    </div>
  );
}

export default UpdatesList;
