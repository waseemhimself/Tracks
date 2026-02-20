package com.finfin.finfin_backend.dto;

public record AuthRequest(
        String email,
        String password
) {}