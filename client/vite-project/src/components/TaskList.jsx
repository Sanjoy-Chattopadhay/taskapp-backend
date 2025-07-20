import TaskItem from "./TaskItem";

const TaskList = ({ tasks, onTaskUpdate, onTaskDelete }) => {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <h3>No tasks yet!</h3>
        <p>Create your first task using the form above.</p>
      </div>
    );
  }

  const completedTasks = tasks.filter((task) => task.completed);
  const pendingTasks = tasks.filter((task) => !task.completed);

  return (
    <div className="task-list">
      {pendingTasks.length > 0 && (
        <div className="task-section">
          <h2>Pending Tasks ({pendingTasks.length})</h2>
          {pendingTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onTaskUpdate={onTaskUpdate}
              onTaskDelete={onTaskDelete}
            />
          ))}
        </div>
      )}

      {completedTasks.length > 0 && (
        <div className="task-section">
          <h2>Completed Tasks ({completedTasks.length})</h2>
          {completedTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onTaskUpdate={onTaskUpdate}
              onTaskDelete={onTaskDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
