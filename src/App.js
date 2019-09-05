import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Header from './components/layout/Header';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import About from './components/pages/About';
//import uuid from 'uuid';
import axios from 'axios';
import './App.css';


/*
Components can have a state which is an object that determines
 how that component renders and behaves
We can have "application level" state by using state manager like
redux or Reacts own contect API.

*/

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    todos:[]
  }

  componentDidMount(){
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
     .then(res => this.setState({ todos: res.data }))
  }

   //Toggle Complete

  markComplete = (id) => {
    //console.log(id)
    this.setState({ todos: this.state.todos.map( todo => {
      if(todo.id ===id ) {
        todo.completed = !todo.completed
      }
      return todo;
    }) });
  }

  
  //Delete Todo 

  delTodo  = (id) => {
    //console.log(id)
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
     .then(res => this.setState({todos: [...this.state.todos.filter(todo => todo.id !== id )]  }) );
  }


  addTodo = (title) => {
    // const newTodo = {
    //   id : uuid.v4(),
    //   title :title,
    //   completed: false
    // }
    //console.log(title)
    axios.post('https://jsonplaceholder.typicode.com/todos', {
      title,
      completed:false
    })
    .then(res => this.setState({ todos: [...this.state.todos, res.data ] }) );

    //this.setState({ todos: [...this.state.todos, newTodo ]  });
  }


  render() {
    //console.log(this.state.todos);
    
    return (
      <Router> 
        <div className="App">
          <div className="container">
          <Header />
           <Route exact path="/" render={props => (
             <React.Fragment>
                <AddTodo addTodo = {this.addTodo}/>
                 <Todos  todos={this.state.todos} markComplete={this.markComplete}
                  delTodo ={this.delTodo}/> 
             </React.Fragment>
            )}/>

          <Route  path="/about"  component ={About} />
           
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
