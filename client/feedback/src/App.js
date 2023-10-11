import './App.css';
import Login from './children/login';
import Employee from './children/employee';
import Manager from './children/manager';
import { useEffect, useState } from 'react';

function App() {
  const [userId, setUserId] = useState();
  const [showManager, setShowManager] = useState(false);
  const [showEmployee, setShowEmployee] = useState(false);
  const [showLogin, setShowLogin] = useState(true);


  return (
    <div className="App">
      <Login show={showLogin} setUserId={setUserId} setShowLogin={setShowLogin}
      setShowManager={setShowManager} setShowEmployee={setShowEmployee} />
      <Employee userId={userId} show={showEmployee}/>
      <Manager userId={userId} show={showManager}/>
    </div>
  );
}

export default App;
