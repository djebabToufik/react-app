import React, { Component } from 'react';
import {AuthContext} from '../context/AuthProvider'
import {Navigate} from 'react-router-dom'
class Page extends Component {
    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = { obj: false };
        // this.handleClick = this.handleClick.bind(this);
      }
    
      async componentDidMount() {
        console.log(this.context)
  
        console.log(localStorage.getItem('access token'))

        var res = await fetch('https://demo.irrokeys.de/line_data/?line=1',{
            method: 'GET',
            headers: {
             
              
              'Authorization': 'Bearer ' + localStorage.getItem('access token'),
    
            }
          })

          if (res.status == 200) {

              var data = await res.json()
              data.reverse()
              console.log(data[0])
              this.setState({obj:data[0]})
          }
          else {
              await this.context.refreshToken()
              this.setState({obj:false})
          
            
          }
     
      }
    render() {
        var data = this.state.obj["data"]
        return (
<div>
    <div className="content-wrapper">
    {/* Content Header (Page header) */}
        <div className="content-header">
        <div className="container-fluid">
        <div className="row mb-2">
            <div className="col-sm-6">
            <h1 className="m-0">Page</h1>
            </div>{/* /.col */}
            <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item active">Page</li>
            </ol>
            </div>{/* /.col */}
        </div>{/* /.row */}
        </div>{/* /.container-fluid */}
        </div>
    {/* /.content-header */}
    {/* Main content */}
    {
        this.state.obj && (<section className="content">
        <div className="container-fluid">
        <div className="row">
        { 
                        Object.keys(data["Machine data"]).map(function(item,i){
                            var temp = {
                                "red":"small-box bg-danger",
                                "green":"small-box bg-success",
                                "orange":"small-box bg-orange",
                                "blue":"small-box bg-info",
                                "gray":"small-box bg-gray",
                                "white":"small-box"
                            }
                          
                        return (<div key={i}  className="col-lg-3 col-6">
                        {/* small box */}
                        <div className={temp[data["Machine data"][item]["state"]]}>
                        <div className="inner">
                            <h3>{data ["Machine data"][item]["value"]}<sup style={{fontSize: 20,left:5}}>{data["Machine data"][item]["unit"]}</sup></h3>
                            <p>{item}</p>
                        </div>
                        <div className="icon">
                            <i className="ion ion-stats-bars" />
                        </div>
                        <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
                        </div>
                    </div>)

                    })
            }

        </div>

        </div>
        </section>)
    }
        
    </div>
       
</div>
          
        );
    }
}
Page.contextType = AuthContext;
export default Page;