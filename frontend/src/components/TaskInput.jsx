import React, { useState } from "react";
import axios from "axios";

function TaskInput({ fetchTasks }) {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");

  const addTask = async () => {
    if (title.trim() === "") {
      alert("Enter task");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/tasks", {
        title: title,
        note: note,
      });

      console.log(res.data);

      setTitle("");
      setNote("");

      fetchTasks();
    } catch (error) {
      console.log(error);
      alert("Task not added");
    }
  };

  return (
    <div className="inputBox">

      <input
        type="text"
        placeholder="Enter task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="input"
        onKeyDown={(e) => {
          if (e.key === "Enter") addTask();
        }}
      />

      <input
        type="text"
        placeholder="Enter note (optional)"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="input"
      />

      <button className="addBtn" onClick={addTask}>
        Add
      </button>

    </div>
  );
}

export default TaskInput;