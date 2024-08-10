import React from 'react';

function Student({ user }) {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Welcome, Student</h2>
      
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h3 className="text-xl font-semibold mb-4">Your Timetable</h3>
        <p>Your timetable will be displayed here once it's created by your teacher.</p>
      </div>
    </div>
  );
}

export default Student;