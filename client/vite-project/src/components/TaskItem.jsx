import { useState } from "react";

const TaskItem = ({ task, onTaskUpdate, onTaskDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({
    title: task.title,
    description: task.description || "",
  });

  const handleToggleComplete = () => {
    onTaskUpdate(task.id, { ...task, completed: !task.completed });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onTaskUpdate(task.id, { ...task, ...editedTask });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTask({ title: task.title, description: task.description || "" });
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setEditedTask({
      ...editedTask,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      {isEditing ? (
        <div className="edit-mode">
          <input
            type="text"
            name="title"
            value={editedTask.title}
            onChange={handleChange}
            className="edit-input"
          />
          <input
            type="text"
            name="description"
            value={editedTask.description}
            onChange={handleChange}
            className="edit-input"
            placeholder="Description..."
          />
          <div className="edit-actions">
            <button onClick={handleSave} className="btn-save">
              Save
            </button>
            <button onClick={handleCancel} className="btn-cancel">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="view-mode">
          <div className="task-content">
            <div className="task-info">
              <h3 className={task.completed ? "strikethrough" : ""}>
                {task.title}
              </h3>
              {task.description && (
                <p className={task.completed ? "strikethrough" : ""}>
                  {task.description}
                </p>
              )}
            </div>
            <div className="task-actions">
              <button
                onClick={handleToggleComplete}
                className={`btn-toggle ${
                  task.completed ? "completed" : "pending"
                }`}
                title={task.completed ? "Mark as pending" : "Mark as completed"}
              >
                {task.completed ? "Do It" : "Done"}
              </button>
              <button onClick={handleEdit} className="btn-edit">
                Edit
              </button>
              <button
                onClick={() => onTaskDelete(task.id)}
                className="btn-delete"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
