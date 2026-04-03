package com.taskmanager.controller;

import com.taskmanager.dto.LoginRequestDTO;
import com.taskmanager.dto.UserRequestDTO;
import com.taskmanager.dto.UserResponseDTO;
import com.taskmanager.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    public UserResponseDTO registerUser(@Valid @RequestBody UserRequestDTO request) {
        return userService.registerUser(request);
    }

    @PostMapping("/login")
    public UserResponseDTO loginUser(@Valid @RequestBody LoginRequestDTO request) {
        return userService.loginUser(request);
    }

    @GetMapping("/test")
    public String test() {
        return "Protected API working";
    }
}