import TaskCard from "./TaskCard";

function TaskList({
  tasks,
  darkMode,
  fetchTasks,
  setIsEditOpen,
  setEditText,
  setEditId,
}) {

  return (

    <div className="taskList">

      {tasks.length === 0 ? (

        <p>No Tasks Found</p>

      ) : (

        tasks.map((task) => (

          <TaskCard
            key={task._id}
            task={task}
            darkMode={darkMode}
            fetchTasks={fetchTasks}
            setIsEditOpen={setIsEditOpen}
            setEditText={setEditText}
            setEditId={setEditId}
          />

        ))

      )}

    </div>
  );
}

export default TaskList;