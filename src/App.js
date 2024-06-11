import React, { Suspense, useEffect } from 'react'
import { HashRouter, Route, Routes, Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { CSpinner, useColorModes } from '@coreui/react'
import './scss/style.scss'

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

const PrivateRoutes = () => {
  let user = { userName: "", isLogin: false }
  // check local storage 
  if (localStorage.getItem('user')) {
    user = JSON.parse(localStorage.getItem('user'))
  }
  return (
    user.isLogin ? <Outlet /> : <Navigate to="/login" />
  )
}

const App = () => {
  return (
    <HashRouter>
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      >
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />
            <Route path="*" name="Home" element={<DefaultLayout />} />
          </Route>
          <Route exact path="/login" name="Login Page" element={<Login />} />
          <Route exact path="/register" name="Register Page" element={<Register />} />
        </Routes>
      </Suspense>
    </HashRouter>
  )
}

export default App
