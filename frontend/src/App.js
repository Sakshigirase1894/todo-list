import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

import Header from "./components/Header";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import EditModal from "./components/EditModal";

import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editText, setEditText] = useState("");
  const [editId, setEditId] = useState(null);

  const [loading, setLoading] = useState(false);

  const API = "http://localhost:5000/api/tasks";

  // FETCH TASKS
  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(API);
      setTasks(res.data);
    } catch (error) {
      console.log("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  }, [API]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div className={darkMode ? "darkContainer" : "container"}>

      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      <TaskInput fetchTasks={fetchTasks} />

      {loading ? (
        <p className="loadingText">Loading tasks...</p>
      ) : (
        <TaskList
          tasks={tasks}
          darkMode={darkMode}
          fetchTasks={fetchTasks}
          setIsEditOpen={setIsEditOpen}
          setEditText={setEditText}
          setEditId={setEditId}
        />
      )}

      {isEditOpen && (
        <EditModal
          editText={editText}
          setEditText={setEditText}
          setIsEditOpen={setIsEditOpen}
          editId={editId}
          fetchTasks={fetchTasks}
        />
      )}

    </div>
  );
}

export default App;