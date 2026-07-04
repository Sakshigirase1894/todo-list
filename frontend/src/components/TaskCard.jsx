import axios from "axios";

function TaskCard({
  task,
  darkMode,
  fetchTasks,
  setIsEditOpen,
  setEditText,
  setEditId,
}) {
const API = `${process.env.REACT_APP_API_URL}/api/tasks`;
  const toggleComplete = async () => {
    try {
      await axios.put(`${API}/${task._id}`, {
        completed: !task.completed,
      });
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTask = async () => {
    const confirmDelete = window.confirm("Delete this task?");
    if (!confirmDelete) return;

    await axios.delete(`${API}/${task._id}`);
    fetchTasks();
  };

  const openEdit = () => {
    setEditText(task.title);
    setEditId(task._id);
    setIsEditOpen(true);
  };

  return (
    <div className={darkMode ? "darkCard" : "card"}>

      <span
        className="text"
        style={{
          textDecoration: task.completed ? "line-through" : "none",
          opacity: task.completed ? 0.6 : 1,
        }}
      >
        {task.title}
      </span>

      {/* NOTE */}
      {task.note && (
        <p className="noteText">
          📝 {task.note}
        </p>
      )}

      <div className="btnGroup">
        <button className="completeBtn" onClick={toggleComplete}>
          {task.completed ? "↩" : "✔"}
        </button>

        <button className="editBtn" onClick={openEdit}>✏</button>
        <button className="deleteBtn" onClick={deleteTask}>🗑</button>
      </div>

    </div>
  );
}

export default TaskCard;