import React, { Component } from 'react'
import PropTypes from 'prop-types';


export class TodoItem extends Component {

    getStyle = () => {
        //long way
        // if(this.props.todo.completed){
        //     return {
        //         textDecoration: 'line-through'
        //     }
        // } else {
        //     return  {
        //         textDecoration: 'none'
        //     }
        // }
        //short way
        return{
            background:"gray",
            padding:'10px',
            borderBottom:'1px #ccc dotted',
            textDecoration:this.props.todo.completed ? 
             'line-through' : 'none' 
        }
    }

    // markComplete = (e) => {
    //     console.log(this.props)
    // }

    render() {

        const { id, title } = this.props.todo;
        return (
            // <div style={itemStyle}>
            //     <p> {this.props.todo.title} </p>
            // </div>
            <div style={this.getStyle()}>
                <p> 
                 {/* <input type="checkbox" onChange={this.markComplete}/> {' '}
                 */}
                 <input type="checkbox" onChange={this.props.markComplete.bind(this, id )}/> {' '}
                 {title} 
                 <button  onClick = {this.props.delTodo.bind(this,id)} style={btnStyle}> x </button> 
                 </p>
            </div>
        )
    }
}


//PropTypes
TodoItem.propTypes = {
    todo: PropTypes.object.isRequired,
    markComplete: PropTypes.func.isRequired,
    delTodo: PropTypes.func.isRequired
}

const btnStyle = {
    background:'red',
    color:'white',
    border: 'none',
    padding: '5px 9px',
    borderRadius: '50%',
    cursor: 'pointer',
    float:'right'
}

const itemStyle = {
    backgroundColor:'gray'
}

export default TodoItem
