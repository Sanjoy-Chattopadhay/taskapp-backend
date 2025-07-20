package com.example.taskapp.service;

import com.example.taskapp.model.Task;
import com.example.taskapp.model.User;
import com.example.taskapp.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    public List<Task> getAllTasksByUser(User user) {
        return taskRepository.findByUser(user);
    }

    public Optional<Task> getTaskByIdAndUser(Long id, User user) {
        return taskRepository.findByIdAndUser(id, user);
    }

    public Task createTask(Task task, User user) {
        task.setUser(user);
        return taskRepository.save(task);
    }

    public Task updateTask(Long id, Task taskDetails, User user) {
        Task task = taskRepository.findByIdAndUser(id, user).orElseThrow();
        task.setTitle(taskDetails.getTitle());
        task.setDescription(taskDetails.getDescription());
        task.setCompleted(taskDetails.getCompleted());
        return taskRepository.save(task);
    }

    public void deleteTask(Long id, User user) {
        Task task = taskRepository.findByIdAndUser(id, user).orElseThrow();
        taskRepository.delete(task);
    }
}