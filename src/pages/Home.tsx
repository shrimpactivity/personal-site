import { useState } from 'react'
import Navigation from '../components/Navigation'

const Home = () => {
  const [groovy, setGroovy] = useState(false);
  return (
    <div>
      <p>Hi, I'm Carson Crow. Welcome to my website.</p>
      <Navigation />
      <button onClick={() => setGroovy(!groovy)}>{groovy ? "Make Website Less Cool" : "Make Website Cooler"}</button>
    </div>
  )
}

export default Home