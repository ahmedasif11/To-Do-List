import React, { useState, useEffect } from "react";

function TodoList() {
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function handleAddTask() {
    const newTask = document.querySelector(".task-input").value;
    if (newTask.trim() !== "") {
      setTodos((prevTodos) => [...prevTodos, newTask]);
      document.querySelector(".task-input").value = "";
    }
  }

  function handleEnter(event) {
    if (event.key === "Enter") {
      handleAddTask();
    }
  }

  function handleRemoveTask(index) {
    setTodos((prevTodos) => prevTodos.filter((_, i) => i !== index));
  }

  function handleMoveUp(index) {
    if (index > 0) {
      setTodos((prevTodos) => {
        const newTodos = [...prevTodos];
        [newTodos[index - 1], newTodos[index]] = [
          newTodos[index],
          newTodos[index - 1],
        ];
        return newTodos;
      });
    }
  }

  function handleMoveDown(index) {
    if (index < todos.length - 1) {
      setTodos((prevTodos) => {
        const newTodos = [...prevTodos];
        [newTodos[index + 1], newTodos[index]] = [
          newTodos[index],
          newTodos[index + 1],
        ];
        return newTodos;
      });
    }
  }

  return (
    <>
      <div className="todo-list-container">
        <input
          onKeyDown={handleEnter}
          className="task-input"
          type="text"
          placeholder="Enter task name here..."
        />
        <button onClick={handleAddTask} className="btn add-btn">
          Add
        </button>
        <br />
        <div className="todo-ul-list">
          <ul>
            {todos.map((element, index) => (
              <>
                <li key={index}>
                  <p>{element}</p>

                  <div className="btn-container">
                    <button
                      onClick={() => handleRemoveTask(index)}
                      className="btn remove-btn"
                    >
                      Remove
                    </button>

                    {index !== 0 ? (
                      <button
                        onClick={() => handleMoveUp(index)}
                        className="btn move-btn"
                      >
                        ☝
                      </button>
                    ) : (
                      <button
                        onClick={() => handleMoveUp(index)}
                        className="btn move-btn hidden-element"
                      >
                        ☝
                      </button>
                    )}

                    {index !== todos.length - 1 ? (
                      <button
                        onClick={() => handleMoveDown(index)}
                        className="btn move-btn"
                      >
                        👇
                      </button>
                    ) : (
                      <button
                        onClick={() => handleMoveDown(index)}
                        className="btn move-btn hidden-element"
                      >
                        👇
                      </button>
                    )}
                  </div>
                </li>
                <div className="todo-list-line">
                  <div className="line"></div>
                </div>
              </>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default TodoList;
