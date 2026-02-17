// React ka useState hook import
import { useState } from "react";

// Unique id generate karne ke liye uuid library
import { v4 as uuidv4 } from "uuid";

// CSS module import (scoped styling)
import styles from "./TodoList.module.css";

export default function TodoList() {
  /* -------------------- STATE MANAGEMENT -------------------- */

  // Todos list state
  const [todos, setTodos] = useState([
    { task: "sample-task", id: uuidv4(), isDone: false }
  ]);

  // Input field state
  const [newTodo, setNewTodo] = useState("");

  /* -------------------- ADD NEW TODO -------------------- */

  const addNewTask = () => {
    // Empty ya sirf space wale input ko ignore karo
    if (newTodo.trim() === "") return;

    // Naya todo add karna
    setTodos((prev) => [
      ...prev,
      { task: newTodo, id: uuidv4(), isDone: false },
    ]);

    // Input clear karna
    setNewTodo("");
  };

  /* -------------------- INPUT CHANGE HANDLER -------------------- */

  const updateTodoValue = (e) => {
    setNewTodo(e.target.value);
  };

  /* -------------------- DELETE TODOS -------------------- */

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const deleteAll = () => {
    setTodos([]);
  };

  /* -------------------- UPPERCASE -------------------- */

  const UpperCaseOne = (id) => {
    setTodos((prev) => prev.map((todo) =>todo.id === id
          ? { ...todo, task: todo.task.toUpperCase() }
          : todo
      )
    );
  };

  const UppercaseAll = () => {
    setTodos((prev) => prev.map((todo) => ({
        ...todo,task: todo.task.toUpperCase(),
      }))
    );
  };

  /* -------------------- MARK AS DONE -------------------- */

  const markAsDone = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, isDone: true } : todo
      )
    );
  };

  const markAllDone = () => {
    setTodos((prev) =>
      prev.map((todo) => ({ ...todo, isDone: true }))
    );
  };

  /* -------------------- UI -------------------- */

  return (
    <div className={styles.todo_container}>
      {/* Input box (Enter key support added) */}
      <label htmlFor="ravi"></label>
      <input
        type="text"
        placeholder="add a task"
        value={newTodo}
        onChange={updateTodoValue}
        id="ravi"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addNewTask();
          }
        }}
        
        className={styles.todo_input}
      />

      {/* Add task button */}
      <button onClick={addNewTask} className={styles.add_btn}>
        Add Task
      </button>

      {/* Todo table */}
      <table className={styles.todo_table}>
        <thead>
          <tr>
            <th>#</th>
            <th>Task</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {todos.length === 0 ? (
            <tr>
              <td colSpan="3">No tasks available</td>
            </tr>
          ) : (
            todos.map((todo, index) => (
              <tr key={todo.id}>
                <td>{index + 1}</td>

                <td className={todo.isDone ? styles.done : ""}>
                  {todo.task}
                </td>

                <td>
                  <button
                    className={`${styles.action_btn} ${styles.delete}`}
                    onClick={() => deleteTodo(todo.id)}
                  >
                    Delete
                  </button>

                  <button
                    className={`${styles.action_btn} ${styles.uppercase}`}
                    onClick={() => UpperCaseOne(todo.id)}
                  >
                    Uppercase
                  </button>

                  <button
                    className={`${styles.action_btn} ${styles.done_btn}`}
                    onClick={() => markAsDone(todo.id)}
                  >
                    Done
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Bottom buttons */}
      <div className={styles.bottom_btns}>
        <button onClick={UppercaseAll} className={styles.add_btn}>
          Uppercase All
        </button>

        <button onClick={markAllDone} className={styles.add_btn}>
          Mark All Done
        </button>

        <button onClick={deleteAll} className={styles.add_btn}>
          Delete All
        </button>
      </div>
    </div>
  );
}