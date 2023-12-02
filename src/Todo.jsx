import { useState, useRef, useEffect } from 'react'
import React from 'react'
import { FiEdit } from 'react-icons/fi'
import { MdDelete } from "react-icons/md"
import { IoMdDoneAll } from 'react-icons/io'

import './Todo.css'

function Todo() {

  const [Todo, setTodo] = useState('')
  const [Todos, setTodos] = useState([])
  const [EditId,setEditId] = useState(0)
  console.log('todo', Todo)

  const addTodo = () => {
     if(Todo !==''){
      setTodos([...Todos, { list:Todo, id: Date.now(), status : false}])
      setTodo('')
     }
     if(EditId){
        const edittodo = Todos.find((todo)=>todo.id === EditId)
        const updatetodo = Todos.map((todo)=>todo.id === edittodo.id ?(todo = {id:todo.id,list:Todo}) :(todo={id:todo.id ,list : todo.list}))
        setTodos(updatetodo)
        setEditId(0)
        setTodo('')
     }
  }

  const submitng = (event) => {
    event.preventDefault();
  }

  const inputRef = useRef('null')

  useEffect(() => {
    inputRef.current.focus
  }) 

  const onDelete = (id) => {
    setTodos( Todos.filter((todo) => todo.id !== id))
  }

  const onCompelete=(id)=>{
      let complete = Todos.map((todo)=>{
         if(todo.id === id){
            return ({...todo,status:!todo.status})
         }
         return todo
      })

      setTodos(complete)
  }

  const onEdit=(id)=>{
      
   const edittodo = Todos.find((todo)=>todo.id === id)
   setTodo(edittodo.list)
   setEditId(edittodo.id)
     
  }


  return (
    <div className='container'>
      <h2>TODO APP</h2>
      <form action="" className="form-group" onSubmit={submitng}>
        <input type="text" ref={inputRef} value={Todo} onChange={(event) => setTodo(event.target.value)} placeholder='Enter you todo list' />
        <button onClick={addTodo}>{EditId ? 'Edit':'Add'}</button>
      </form>
      <div className='list'>
        <ul>
          {Todos.map((todo) => (
            <li className='list-items' >
              <div className='list-item-list' id={todo.status?'list-item':null}>{todo.list}</div>
              <span>
                <IoMdDoneAll className='list-item-icons'
                 id='complete'
                 title='complete'
                 onClick={()=> onCompelete(todo.id)}
                  />
                <FiEdit className='list-item-icons'
                 id='edit' 
                 title='edit'
                 onClick={()=>onEdit(todo.id)}
                 />
                <MdDelete className='list-item-icons'
                  id='delete'
                  title='delete'
                  onClick={() => onDelete(todo.id)}
                />
              </span>
            </li>
          ))}
        </ul>
      </div>

    </div>
  )
}

export default Todo
