import React, { useState } from 'react';
import { createTimetable } from '../api';

function Teacher({ user }) {
  const [timetable, setTimetable] = useState('');

  const handleCreateTimetable = async (e) => {
    e.preventDefault();
    try {
      await createTimetable(user.user._id, timetable);
      alert('Timetable created successfully');
    } catch (error) {
      alert('Failed to create timetable');
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Welcome, Teacher</h2>
      
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h3 className="text-xl font-semibold mb-4">Create Timetable</h3>
        <form onSubmit={handleCreateTimetable} className="space-y-4">
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter timetable details"
            value={timetable}
            onChange={(e) => setTimetable(e.target.value)}
            rows="6"
            required
          ></textarea>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Create Timetable
          </button>
        </form>
      </div>
    </div>
  );
}

export default Teacher;