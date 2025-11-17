import { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(saved);
  }, []);

  const save = (list) => {
    setTasks(list);
    localStorage.setItem("tasks", JSON.stringify(list));
  };

  const addTask = () => {
    if (!task.trim()) return;
    const list = [...tasks, { text: task, completed: false }];
    save(list);
    setTask("");
  };

  const markDone = (index) => {
    const list = [...tasks];
    list[index].completed = !list[index].completed;
    save(list);
  };

  const deleteTask = (index) => {
    const list = tasks.filter((_, i) => i !== index);
    save(list);
  };

  return (
    <div className="container">
      <h2>To-Do List</h2>

      <div className="input-box">
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter task"
        />
        <button className="big-btn" onClick={addTask}>Add Task</button>
      </div>

      <ul className="task-list">
        {tasks.map((t, i) => (
          <li key={i} className="task">
            <span
              style={{
                textDecoration: t.completed ? "line-through" : "none",
              }}
            >
              {t.text}
            </span>

            <div>
              <button className="small-btn" onClick={() => markDone(i)}>Done</button>
              <button className="small-btn" onClick={() => deleteTask(i)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
