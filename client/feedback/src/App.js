import './App.css';
import Login from './children/login';
import Employee from './children/employee';
import Manager from './children/manager';
import { useEffect, useState } from 'react';

function App() {
  const [userId, setUserId] = useState();
  const [userInfo, setUserInfo] = useState({});
  const [showManager, setShowManager] = useState(false);
  const [showEmployee, setShowEmployee] = useState(false);
  const [showLogin, setShowLogin] = useState(true);


  return (
    <div className="App">
      {(showEmployee || showManager) ? <div className='logout-button'>
        <button className='button' onClick={() => {
          setShowEmployee(false)
          setShowManager(false)
          }}>Logout</button>
      </div> : ''}
      <Login show={showLogin} setUserId={setUserId} setShowLogin={setShowLogin}
      setShowManager={setShowManager} setShowEmployee={setShowEmployee}
      setUserInfo={setUserInfo} />
      <Employee userId={userId} userInfo={userInfo} show={showEmployee}/>
      <Manager userId={userId} userInfo={userInfo} show={showManager}/>
    </div>
  );
}

export default App;
