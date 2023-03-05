
//import React, { userState } from "react"
//import React, { Component } from "react"
import React from "react"
import './App.css';
import Register from "./Register"

//import { BrowserRouter, Route } from 'react-router-dom';
// import{ Register } from "./Register"
// import{ Login } from "./Login"

function App() {
  return (
    <div className="App">
        <Register/>
    </div>
    
  );
}

// class App extends Component{
//   constructor(props){
//     super(props);
//     this.state = {
//       items: [],
//       isLoaded: false,
//     }
//   }

//   // componentDidMount(){
//   //   fetch('http://localhost:3000/users').then(res => )
//   // }

//   render(){

//     var {isLoaded, items} = this.state;

//     if(!isLoaded){
//       return <div>
//         Not loaded. 
//       </div>
//     }

//     else{
//       <div className="App">
//         <Register/>
//       </div>      
//     }

//   }
// }


export default App;
