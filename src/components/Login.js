import React, { Component } from 'react';
import {AuthContext} from '../context/AuthProvider'
class Login extends Component {
    constructor(props){
        super(props)
        console.log(props)
        
        this.HandleSignIn = this.HandleSignIn.bind(this)
        this.state = {
            username:'',
            password:'',
            isLoginerror:false,
            errorMsg:'',
            onsuccess:this.props.onloginsuccess,
           

        }
        console.log(this.state)
    }
    componentDidMount() {
        let value = this.context;
        console.log(this.context)
        /* perform a side-effect at mount using the value of MyContext */
      }
    async HandleSignIn(e) {
        e.preventDefault()
        try {
            var cred = await fetch('https://demo.irrokeys.de/api/token/',{
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "username":this.state.username[1],
                    "password":this.state.password[1]
                })
              })
              console.log(cred)
              if(cred.status == 401) {

                //   var tokens = await cred.json()
          console.log('erroooo')
                  var detail = await cred.json()
                this.setState({isLoginerror:true,errorMsg:detail['detail']})
                // this.setState([this.state.errorMsg,detail['detail']])
              }
              else {
                var detail = await cred.json()
                console.log(detail['access'])
                // this.context.setAuth(detail['access'])
                localStorage.setItem('access token',detail['access'])
                localStorage.setItem('refresh token',detail['refresh'])
                localStorage.setItem('isAuthenthicated',true)
                  this.context.setToken(detail['access'])
              }

        } catch (error) {
            
        }
       


      
        // var res = await fetch('https://demo.irrokeys.de/line_data/?line=1',{
        //     method: 'GET',
        //     headers: {
             
              
        //       'Authorization': 'Bearer ' + tokens['access'],
    
        //     }
        //   })
        //   var data = await res.json()
        //   console.log(data)
        // //   data.reverse()
        //   console.log(data[0])
    }
    render() {
   
        return (

<div className='content-wrapper m-0 bg-white' style={{minHeight:"100vh"}}>
    <section className='content h-100' style={{minHeight:"inherit"}}>

    <div className='container-fluid d-flex' style={{minHeight:"inherit"}}>

    <div className="login-box m-auto">
        <div className="login-logo">
            <a><b>QUALI</b>TEX</a>
        </div>
        {/* /.login-logo */}
        <div className="card bg-info">
            <div className="card-body login-card-body bg-light">

            <p className={"login-box-msg mb-5 " + (this.state.isLoginerror ? 'bg-danger' : '')} >{ this.state.isLoginerror ? this.state.errorMsg: 'Sign in to start your session'}</p>
            <form  method="post" onSubmit={this.HandleSignIn}>
                <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Username" onChange={(e)=>{

                    this.setState({username:[this.state.username,e.target.value]})

                    }} />
                <div className="input-group-append">
                    <div className="input-group-text">
                    <span className="fas fa-user" />
                    </div>
                </div>
                </div>
                <div className="input-group mb-3">
                <input type="password" className="form-control" placeholder="Password" onChange={(e)=>{

                    this.setState({password:[this.state.password,e.target.value]})

                    }}  />
                <div className="input-group-append">
                    <div className="input-group-text">
                    <span className="fas fa-lock" />
                    </div>
                </div>
                </div>
                <div className="row">
                <div className="col-8">
                    <div className="icheck-primary">
                    <input type="checkbox" id="remember" />
                    <label htmlFor="remember">
                        Remember Me
                    </label>
                    </div>
                </div>
                {/* /.col */}
                <div className="col-4">
                    <button type="submit" className="btn btn-warning btn-block" >Sign In</button>
                </div>
                {/* /.col */}
                </div>
            </form>
         
            {/* /.social-auth-links */}
            <p className="mb-1">
                <a href="forgot-password.html">I forgot my password</a>
            </p>

            </div>
            {/* /.login-card-body */}
        </div>
    </div>
    </div>
    </section>

</div>


        );
    }
}
Login.contextType = AuthContext;
export default Login;