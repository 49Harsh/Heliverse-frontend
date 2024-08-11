import React, { useState, useEffect } from 'react';
import { createTimeTable, getTeacherTimeTable } from '../api'

const Teacher = () => {
  const [timeTable, setTimeTable] = useState([]);
  const [newEntry, setNewEntry] = useState({ day: '', subject: '', startTime: '', endTime: '' });

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

  const handleInputChange = (e) => {
    setNewEntry({ ...newEntry, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTimeTable(newEntry);
      setNewEntry({ day: '', subject: '', startTime: '', endTime: '' });
      fetchTimeTable();
    } catch (error) {
      console.error('Error creating time table entry:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
    {/* here teacher can create timetable */}
      <h2 className="text-2xl font-bold mb-4">Create Time Table Entry</h2>
      <form onSubmit={handleSubmit} className="mb-8">
        <input
          type="text"
          name="day"
          value={newEntry.day}
          onChange={handleInputChange}
          placeholder="Day"
          className="border p-2 mr-2"
          required
        />
        <input
          type="text"
          name="subject"
          value={newEntry.subject}
          onChange={handleInputChange}
          placeholder="Subject"
          className="border p-2 mr-2"
          required
        />
        <input
          type="time"
          name="startTime"
          value={newEntry.startTime}
          onChange={handleInputChange}
          className="border p-2 mr-2"
          required
        />
        <input
          type="time"
          name="endTime"
          value={newEntry.endTime}
          onChange={handleInputChange}
          className="border p-2 mr-2"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Entry</button>
      </form>

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
  );
};

export default Teacher;