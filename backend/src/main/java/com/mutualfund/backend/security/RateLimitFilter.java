package com.mutualfund.backend.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.concurrent.TimeUnit;

@Component
public class RateLimitFilter extends OncePerRequestFilter {

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    private static final int MAX_REQUESTS_PER_MINUTE = 100;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        try {
            String key = getRateLimitKey(request);
            if (key != null) {
                Long count = redisTemplate.opsForValue().increment(key);
                if (count != null && count == 1) {
                    redisTemplate.expire(key, 1, TimeUnit.MINUTES);
                }

                if (count != null && count > MAX_REQUESTS_PER_MINUTE) {
                    response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
                    response.getWriter().write("Too many requests");
                    return;
                }
            }
        } catch (Exception e) {
            // Redis unavailable - Fail open (allow request)
            logger.warn("Rate limit check failed (Redis down?): " + e.getMessage());
        }

        filterChain.doFilter(request, response);
    }

    private String getRateLimitKey(HttpServletRequest request) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated() && !"anonymousUser".equals(auth.getPrincipal())) {
            try {
                UserDetailsImpl userDetails = (UserDetailsImpl) auth.getPrincipal();
                return "rate_limit:user:" + userDetails.getId();
            } catch (Exception e) {
                // Fallback to IP if principal casting fails or strictly anonymous
                return "rate_limit:ip:" + request.getRemoteAddr();
            }
        }
        return "rate_limit:ip:" + request.getRemoteAddr();
    }
}
