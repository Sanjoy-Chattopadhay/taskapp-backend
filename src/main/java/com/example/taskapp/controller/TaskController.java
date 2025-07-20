package com.example.taskapp.controller;

import com.example.taskapp.model.Task;
import com.example.taskapp.model.User;
import com.example.taskapp.service.TaskService;
import com.example.taskapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:5173")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @Autowired
    private UserService userService;

    private User getUserFromRequest(@RequestHeader("user-email") String email) {
        return userService.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
    }

    @GetMapping
    public List<Task> getAllTasks(@RequestHeader("user-email") String email) {
        User user = getUserFromRequest(email);
        return taskService.getAllTasksByUser(user);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long id, @RequestHeader("user-email") String email) {
        User user = getUserFromRequest(email);
        return taskService.getTaskByIdAndUser(id, user)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createTask(@RequestBody Task task, @RequestHeader("user-email") String email) {
        try {
            User user = getUserFromRequest(email);
            Task createdTask = taskService.createTask(task, user);
            return ResponseEntity.ok(createdTask);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateTask(@PathVariable Long id, @RequestBody Task task, @RequestHeader("user-email") String email) {
        try {
            User user = getUserFromRequest(email);
            Task updatedTask = taskService.updateTask(id, task, user);
            return ResponseEntity.ok(updatedTask);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable Long id, @RequestHeader("user-email") String email) {
        try {
            User user = getUserFromRequest(email);
            taskService.deleteTask(id, user);
            return ResponseEntity.ok(Map.of("message", "Task deleted successfully"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}