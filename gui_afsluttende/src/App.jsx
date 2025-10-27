import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import Description from './Pages/Description.jsx'
import ProductPage from './Pages/Product_Page.jsx'
import MainLayout from './layout/MainLayout/MainLayout.jsx'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="description" element={<Description />} />
          <Route path="product" element={<ProductPage />} />
        </Route>
      </Routes>
    </Router>
  )
}
export default App
