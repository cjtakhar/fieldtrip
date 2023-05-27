import { BrowserRouter, Routes, Route, Switch} from 'react-router-dom';
import Login from './components/login'
import Dash from './components/dash'
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/fieldtrip" element={<Login />} />
          <Route path="/lfg" element={<Dash />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
