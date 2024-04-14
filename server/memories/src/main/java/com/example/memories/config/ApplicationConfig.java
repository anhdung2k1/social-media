package com.example.memories.config;

import com.example.memories.entity.AccountsEntity;
import com.example.memories.repository.repositoryJPA.AccountsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Collections;

/*
    @author Anh Dung
 */
@Configuration
@RequiredArgsConstructor
public class ApplicationConfig {
    private final AccountsRepository accountsRepository;

    //config loadUserByUsername bean
   @Bean
    public UserDetailsService userDetailsService() {
       return new UserDetailsService() {
           @Override
           public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
               AccountsEntity user = accountsRepository.findByEmail(username)
                       .orElseThrow(() -> new UsernameNotFoundException("User not found"));

               if (user == null)
                   throw new UsernameNotFoundException(username);

               return new User(user.getEmail(), user.getHashPassword(), Collections.emptyList());
           }
       };
    }
    // Inject the Bean AuthenticationProvider into IoC
    @Bean
    public AuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService());
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    // Inject the Bean Password Encoder into IoC
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
