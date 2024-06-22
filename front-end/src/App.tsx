import './App.css'
import { WebRouters } from './routes/Routes.tsx'
import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

function App() {

  return (
    <>
      <Router>
        <Toaster
          position="top-right"
          reverseOrder={false}
        />

        <WebRouters />
      </Router>
    </>
  )
}

export default App