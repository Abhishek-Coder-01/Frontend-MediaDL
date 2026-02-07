import "./index.css"
import { useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import AOS from "aos"
import "aos/dist/aos.css"
import Nav from "./Components/Nav.jsx"
import Footer from "./Components/Footer.jsx"
import Home from "./Components/Home.jsx"
import Feature from "./Components/Feature.jsx"
import About from "./Components/About.jsx"
import Dashboard from "./Components/Dashboard.jsx"
import Scroll from "./Components/Scroll.jsx"
import { ReactLenis, useLenis } from "lenis/react"


function App() {
  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-out-quart",
      once: true,
      offset: 120,
    })
  }, [])

  useLenis(() => {
    AOS.refresh()
  })

  return (
    <ReactLenis root>
      <Nav />

      <Routes>
        <Route path="/" element={
            <>
              <Home />
              <Feature />
              <About />
              <Footer />
              <Scroll />
            </>
          }
        />

        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </ReactLenis>
  )
}

export default App
