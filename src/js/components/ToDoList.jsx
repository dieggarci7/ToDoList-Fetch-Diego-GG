import React, { useState, useEffect } from "react";

const ToDo = () =>{

    const [tareas, setTareas] = useState ([])
    const [nuevaTarea, setNuevaTarea] = useState ('')

    const nuevoUsuario = () => {
        fetch('https://playground.4geeks.com/todo/users/diego',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({})
        })
        .then((response) => {
            if (response.status === 400 || response.status === 409) {
                console.warn("Usuario ya existe.");
                return;
            }
            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }
            return response.json();
        })
        .then((data) => {
            console.log('Respuesta del servidor:', data);
        })
        .catch((error) => {
            console.error('Usuario Creado:', error);
        });
    }

    useEffect(()=>{
        nuevoUsuario();
        listaTareas();
    }, []);

    const listaTareas= () =>{
        fetch('https://playground.4geeks.com/todo/users/diego')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }
            return response.json();
        })
        .then((data) => {
           setTareas(data.todos)
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    const validarYAgregarTarea= (e) => {
        if(e.key === "Enter"){
            if(nuevaTarea.trim() === '' || tareas.some(t => t.label === nuevaTarea.trim())) { 
                alert("Estas intentando agregar una tarea existente o campo vacio.");
                return;
            };
      

            setNuevaTarea('');

            fetch('https://playground.4geeks.com/todo/todos/diego',{
                method: 'POST',
                headers:{
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    label: nuevaTarea.trim(),
                    done: false
                })
            })
            .then(response=>{
                console.log(response.ok);
                console.log(response.status);
            return response.json()
            })
            .then(data=> {
                listaTareas();
                console.log(data)
            })
            .catch(error=>{
                console.log(error)
            })
        };
    };

    const eliminarTarea=(id) => {

        setTareas(prev => prev.filter(t => t.id !== id)); 

    fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => {
            console.log(response.ok);
            console.log(response.status);
            return response.json();
        })
        .then(data => {
            listaTareas(); 
            console.log(data);
        })
        .catch(error => {
            console.log(error);
        });
    };

    const limpiarTodasLasTareas=()=>{
        fetch('https://playground.4geeks.com/todo/users/diego',{
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify([])
        })
        .then(response=>{
            console.log(response.ok);
            console.log(response.status);
        return response.json()
        })
        .then(data=> {
            console.log("Todas las tareas han sido eliminadas:", data);
            setTareas([]);
        })
        .catch(error=>{
            console.log(error)
        });
    }

    
    return (
        <div className="hoja">
            <h1>Lista de Tareas</h1>
            <input value={nuevaTarea} placeholder="Añade una tarea..." onChange={(e)=> setNuevaTarea(e.target.value)} onKeyDown={validarYAgregarTarea}/>
            <ul>
            {tareas.map((tarea) => (
                <li key={tarea.id}>
                <span>{tarea.label}</span>
                <button className="cruz" onClick={() => eliminarTarea(tarea.id)}>❌</button>
                </li>
                ))}
            </ul>
            <footer>
                <button className="eliminarTodo" type="button" onClick={limpiarTodasLasTareas}>Limpiar</button>
            </footer>
        </div>
    );
}

export default ToDo
