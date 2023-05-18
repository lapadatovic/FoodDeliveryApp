import './App.css';
import {Route, Routes} from 'react-router-dom'
import { Header, MainContainer, CreateContainer } from './components';
import { AnimatePresence } from 'framer-motion';

function App() {
  return (
    <AnimatePresence mode='wait'>
      <div className="w-screen h-auto flex flex-col bg-primary">
        <Header />

        <main className='mt-24 px-16 py-4 w-full'>
          <Routes>
            <Route path='/' element={<MainContainer />} />
            <Route path='/createItem' element={<CreateContainer />} />
          </Routes>
        </main>
      </div>
    </AnimatePresence>
    
  );
}

export default App;
