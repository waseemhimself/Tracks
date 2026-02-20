package com.tracks.backend.dto;

public record AuthRequest(
        String email,
        String password
) {}