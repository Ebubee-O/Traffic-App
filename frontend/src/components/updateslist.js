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
    <div className="updates">
      <h3>Recent Updates</h3>
      {updates.map(update => (
        <div key={update.id}>{update.text}</div>
      ))}
    </div>
  );
}

export default UpdatesList;
