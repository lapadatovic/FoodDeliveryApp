import './App.css';
import {Route, Routes} from 'react-router-dom'
import { Header } from './components';

function App() {
  return (
    <div className="w-screen h-auto flex flex-col bg-primary">
      <Header />

      <main className='mt-24 p-8 w-full'>Main Container</main>
    </div>
  );
}

export default App;
