import React, { Component } from 'react';
import Nav from './components/Nav';
import Sidebar from './components/Sidebar';
import Main from './components/Main';
import Page from './components/Page';
import Login from './components/Login';
import { BrowserRouter as Router, Switch, Route,Routes,Navigate } from "react-router-dom";

import {AuthContext} from './context/AuthProvider'

class App extends Component {
constructor(props) {
  super(props)
  this.onLoginSuccess = this.onLoginSuccess.bind(this)
  this.setToken = this.setToken.bind(this)
  this.refreshToken = this.refreshToken.bind(this)
  this.state = {
    isauthenthicated:localStorage.getItem('isAuthenthicated'),
    token : '',
    
  }
}
setToken(token) {
  this.setState({isauthenthicated:true,token:token})
}
async refreshToken() {
  var refresh=  localStorage.getItem('refresh token')
  console.log(refresh)
  var res = await fetch('https://demo.irrokeys.de/api/token/refresh/',{

    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        "refresh":refresh
       
    })
  })
  if (res.status==200) {
var access = await res.json()
localStorage.setItem('access token',access['access'])
console.log(access)
    this.setState({isauthenthicated:true,token:access['access']})
  }
  else {
    localStorage.setItem('isauthenthicated',false)
    this.setState({isauthenthicated:false})
  }
}
onLoginSuccess() {
  this.setState({isauthenthicated:true});
}
  render() {
    return (
        <>
      <AuthContext.Provider value={{
        token:this.state.token,
        setToken:this.setToken,
        refreshToken:this.refreshToken
        }}>

      {
        !this.state.isauthenthicated ? <Login onloginsuccess = {this.onLoginSuccess}></Login> : 
        <Router>
          
          <Nav></Nav>
          <Sidebar></Sidebar>
          
          <Routes>
            <Route path="/" element={<Main></Main>}>
            </Route>
              <Route path="page" element={<Page />} />
             
          </Routes>
        </Router>
      }
      </AuthContext.Provider>
      
      
      </>
    );
  }
}

export default App;