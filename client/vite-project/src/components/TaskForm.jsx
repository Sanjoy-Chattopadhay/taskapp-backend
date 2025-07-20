import { useState } from "react";

const TaskForm = ({ onTaskCreate }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.title.trim()) return;

    onTaskCreate(task);
    setTask({ title: "", description: "" });
  };

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <div className="form-group">
        <input
          type="text"
          name="title"
          placeholder="Enter task title..."
          value={task.title}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          name="description"
          placeholder="Enter description (optional)..."
          value={task.description}
          onChange={handleChange}
        />
      </div>
      <button type="submit" className="btn-primary">
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
