import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Logo from './shared/Logo'
import { useAuth } from '../context/AuthContext'
import NavLink from './shared/NavLink'

const Header = () => {
  const auth = useAuth();
  return (
    <AppBar 
      sx={{
        bgcolor: "transparent", 
        position: "static", 
        boxShadow: "none"
      }}
    >
      <Toolbar sx={{ display: "flex" }}>
        <Logo />
        <div>
          {auth?.isLogged ? (
            <>
              <NavLink 
                bg="#00fffc" 
                to="/chat" 
                text="Go To Chat" 
                textColor="black" 
              />
              <NavLink 
                bg="#51538f" 
                to="/" 
                text="Logout" 
                textColor="white" 
                onClick={auth.logout}
              />
            </>
          ) : (
            <>
              <NavLink 
                  bg="#00fffc" 
                  to="/login" 
                  text="Login" 
                  textColor="black" 
                />
                <NavLink 
                  bg="#51538f" 
                  to="/signup" 
                  text="Signup" 
                  textColor="white"
                />
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Header