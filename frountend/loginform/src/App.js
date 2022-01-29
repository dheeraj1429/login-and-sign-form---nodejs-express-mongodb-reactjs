import './App.css';
import { Routes, Route } from 'react-router';
import LogInComponent from './Components/LoginComponent/LogInComponent';
import SignInComponent from './Components/SignInComponent/SignInComponent';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/login" element={<LogInComponent />} />
        <Route exact path="/signin" element={<SignInComponent />} />
      </Routes>
    </div>
  );
}

export default App;
