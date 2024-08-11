import React from 'react';
import {getTeacherTimeTable } from '../api'
import { useState, useEffect } from 'react';

function Student() {
  const [timeTable, setTimeTable] = useState([]);

  useEffect(() => {
    fetchTimeTable();
  }, []);

  const fetchTimeTable = async () => {
    try {
      const data = await getTeacherTimeTable();
      setTimeTable(data);
    } catch (error) {
      console.error('Error fetching time table:', error);
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Welcome, Student</h2>
      
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h3 className="text-xl font-semibold mb-4">Your Timetable</h3>
        <h2 className="text-2xl font-bold mb-4">My Time Table</h2>
      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border p-2">Day</th>
            <th className="border p-2">Subject</th>
            <th className="border p-2">Start Time</th>
            <th className="border p-2">End Time</th>
          </tr>
        </thead>
        <tbody>
          {timeTable.map((entry, index) => (
            <tr key={index}>
              <td className="border p-2">{entry.day}</td>
              <td className="border p-2">{entry.subject}</td>
              <td className="border p-2">{entry.startTime}</td>
              <td className="border p-2">{entry.endTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default Student;