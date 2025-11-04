package com.example.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/debug")
public class DebugController {
    @PostMapping("/csrf-check")
    public ResponseEntity<String> check(HttpServletRequest req) {
        String header = req.getHeader("XSRF-TOKEN");
        Cookie[] cookies = req.getCookies();
        String cookieVal = "(no cookie)";
        if (cookies != null) {
            for (Cookie c : cookies) {
                if ("XSRF-TOKEN".equals(c.getName()))
                    cookieVal = c.getValue();
            }
        }
        System.out.println("DEBUG - header XSRF-TOKEN = " + header);
        System.out.println("DEBUG - cookie XSRF-TOKEN = " + cookieVal);
        return ResponseEntity.ok("ok");
    }
}
