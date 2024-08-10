import React, { useState } from 'react';
import Login from './components/Login';
import Principal from './components/Principal';
import Teacher from './components/Teacher';
import Student from './components/Student';

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">Classroom Website</h1>
      </header>
      <main className="container mx-auto mt-8 p-4">
        {!user ? (
          <Login setUser={setUser} />
        ) : user.role === 'principal' ? (
          <Principal user={user} />
        ) : user.role === 'teacher' ? (
          <Teacher user={user} />
        ) : (
          <Student user={user} />
        )}
      </main>
    </div>
  );
}

export default App;