import React from 'react';

function TimetableInfo({ togglePopup }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/2 lg:w-1/3">
        <h2 className="text-xl font-bold mb-4">Information</h2>
        <p className="mb-4">
        To create a classroom, you will need the teacher and student IDs. You can copy and paste the provided IDs:
            <ul>
                <li>Teacher ID: 66b9acc0d06a76f60a2e9a73</li>
                <li>Student ID: 66b9b07398a7374d03bc4497</li>
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
