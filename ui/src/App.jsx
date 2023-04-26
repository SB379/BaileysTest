import { useState } from 'react'
import TopBar from './components/topBar'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='container'>
        <TopBar/>
        <div className='dashboard'>
          <div className='port-deltas'>
            
          </div>
        </div>
      </div>
    </>
  )
}

export default App
