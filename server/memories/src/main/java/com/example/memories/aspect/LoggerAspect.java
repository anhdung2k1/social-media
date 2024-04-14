package com.example.memories.aspect;

import jakarta.validation.constraints.NotNull;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Configuration;

import java.time.Duration;
import java.time.Instant;

/*
    @author Anh Dung
 */
@Configuration
@Aspect
public class LoggerAspect {
    private Logger logger = LoggerFactory.getLogger(LoggerAspect.class);
    @Around("execution(* com.example.memories.*.*(..))")
    public Object before(@NotNull ProceedingJoinPoint joinPoint) throws Throwable{
        logger.info(joinPoint.getSignature().toString() + "method start");
        Instant startTime = Instant.now(); //Get the current time
        Object result = joinPoint.proceed();
        Instant endTime = Instant.now();
        long timeProcess = Duration.between(startTime, endTime).toMillis(); // Subtract the time process -> Get the time running
        logger.info("Time executed: "+ joinPoint.getSignature().toString() + "running end" + timeProcess);
        logger.info(joinPoint.getSignature().toString() + "end");
        return result;
    }
    @AfterThrowing(value = "execution(* com.example.memories.*.*(..))", throwing = "e")
    public void logExeption(@NotNull JoinPoint joinPoint, @NotNull Exception e){
        logger.error(joinPoint.getSignature().toString() + "An exeption happend because of" + e.getMessage());
    }
}
