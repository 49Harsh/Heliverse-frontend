import React from 'react';

function TimetableInfo({ togglePopup }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/2 lg:w-1/3">
        <h2 className="text-xl font-bold mb-4">Information</h2>
        <p className="mb-4">
        To create a classroom, you will need the teacher and student IDs. You can copy and paste the provided IDs:
            <ul>
                <li>Teacher ID: 66b76207101f0a0b538b3f81</li>
                <li>Student ID: 66b8b061a6766040bd54cfe8</li>
            </ul>
            
        </p>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={togglePopup}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default TimetableInfo;
