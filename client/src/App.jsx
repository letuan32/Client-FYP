import { 
  BrowserRouter
  ,Navigate
  ,Routes
  ,Route
} from 'react-router-dom'

import HomePage from './pages/homePage'
import LoginPage from './pages/loginPage'
import ProfilePage from './pages/profilePage'
import PostForm from './pages/postPage/PostForm'



import { useMemo } from 'react'
import { useSelector } from 'react-redux';


import {CssBaseline, ThemeProvider} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./utils/theme";

import { setLogout } from './state'

import useTokenExpiration from './utils/checkToken'
import PostDonation from "./pages/postPage/PostDeatailPage";
import Navbar from "./components/navbar";
import TermsAndConditionsPage from "./pages/policypage";
import BasicTable from "./pages/adminPage";


const App = () => { 
  //Check if a user is loggedIn
  const isLoggedIn = useTokenExpiration();

  if(!isLoggedIn){
    setLogout(); //To clear all tokens if they have expired
  }

  //To get the current mode from the redux store
  const mode = useSelector((state ) =>  state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])

  return (
    <main>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <Routes>
            <Route path='/' element={isLoggedIn ? <HomePage/> : <Navigate to="/login" />}/>
            <Route path='/policy' element={<TermsAndConditionsPage/>}/>

            <Route path='/'>
                <Route path="login" element={!isLoggedIn ? <LoginPage/> : <Navigate to="/" />} />
                <Route path="register" element={!isLoggedIn ? <LoginPage/> : <Navigate to="/" />} />
            </Route>

            <Route path="/profile">

                <Route path=":username" element={isLoggedIn ? <ProfilePage/> : <Navigate to="/login" />} />
                <Route path="" element={isLoggedIn ? <ProfilePage/> : <Navigate to="/login" />} />
            </Route>

            <Route path="/post">
              <Route path=":id" element={isLoggedIn ? <PostDonation/> : <Navigate to="/login" />} />
              <Route path="" element={isLoggedIn ? <PostForm/> : <Navigate to="/login" />} />
            </Route>

            <Route path="/admin">
              <Route path="approve" element={isLoggedIn ? <BasicTable/> : <BasicTable />} />
            </Route>


            <Route
                path="*"
                element={isLoggedIn ? <HomePage/> : <Navigate to="/login" />}
              />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </main>
  )
}

export default App