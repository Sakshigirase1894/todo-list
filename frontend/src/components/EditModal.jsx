import axios from "axios";
import { useState, useEffect } from "react";

function EditModal({
  editText,
  setEditText,
  setIsEditOpen,
  editId,
  fetchTasks,
  editNote,
  setEditNote,
}) {
  const API = "http://localhost:5000/api/tasks";

  const [note, setNote] = useState("");

  useEffect(() => {
    setNote(editNote || "");
  }, [editNote]);

  const saveEdit = async () => {
    if (!editText.trim()) return;

    try {
      await axios.put(`${API}/${editId}`, {
        title: editText,
        note: note,
      });

      setIsEditOpen(false);
      fetchTasks();
    } catch (error) {
      console.log("Edit Error:", error);
    }
  };

  return (
    <div className="modalOverlay">
      <div className="modal">

        <h2>Edit Task</h2>

        {/* TITLE */}
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          className="input"
          placeholder="Update task..."
        />

        {/* NOTE */}
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="input"
          placeholder="Update note..."
        />

        <div className="modalButtons">

          <button className="addBtn" onClick={saveEdit}>
            Save
          </button>

          <button
            className="deleteBtn"
            onClick={() => setIsEditOpen(false)}
          >
            Cancel
          </button>

        </div>

      </div>
    </div>
  );
}

export default EditModal;