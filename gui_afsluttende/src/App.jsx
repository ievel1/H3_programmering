import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import ProductDetail from './Pages/Description.jsx'
import ProductPage from './Pages/Product_Page.jsx'
import MainLayout from './layout/MainLayout/MainLayout.jsx'

import './App.css'

function App() {
  return (
    <Router>
      <Routes className="app_wrapper">
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<ProductPage />} />
          <Route path="products/:id" element={<ProductDetail />} />
        </Route>
      </Routes>
    </Router>
  )
}
export default App
