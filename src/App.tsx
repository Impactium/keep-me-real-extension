import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import s from './App.module.css'
import { cn } from '@impactium/utils';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className={s.logo} alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className={cn(s.logo, s.react)} alt="React logo" />
        </a>
      </div>
      <h1>KeepMeReal</h1>
      <div className={s.card}>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Press login <code>or register</code> to start  
        </p>
      </div>
      <p className={s.readTheDocs}>
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
