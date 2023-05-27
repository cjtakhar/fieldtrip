import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dash from './components/dash'
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dash />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
