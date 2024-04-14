package com.example.memories.controller;


import com.example.memories.builder.AuthenticationResponse;
import com.example.memories.exeption.AccountNotFoundException;
import com.example.memories.model.Accounts;
import com.example.memories.service.interfaces.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

/*
    @author Anh Dung
 */
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class AccountsController {
    @Autowired
    private final AccountService accountService;

    public AccountsController(AccountService accountService){
        this.accountService = accountService;
    }
    //Sign up
    @PostMapping("/accounts/signup")
    //Perform create a new account -> Gen new id
    //We need a handle token as well
    public ResponseEntity<AuthenticationResponse> createAccount(@RequestBody Accounts account) throws Exception {
        return ResponseEntity.ok(
                accountService.createAccount(account)
        );
    }
    //SIGN IN
    @PostMapping("/accounts/signin")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody Accounts account) throws AccountNotFoundException {
        return ResponseEntity.ok(accountService.authenticate(account));
    }
    @GetMapping("/accounts")
    public List<Accounts> getAllAccounts() {
        // Get all the account in the admin board
        return accountService.getAllAccounts();
    }
    @DeleteMapping("/accounts/{id}")
    public ResponseEntity<Map<String,Boolean>> deleteAccount(@PathVariable Long id) throws AccountNotFoundException {
        boolean deleted = accountService.deleteAccount(id);
        Map<String,Boolean> response = new HashMap<>();
        response.put("deleted", deleted);
        return ResponseEntity.ok(response);
    }
    @GetMapping("/accounts/{id}")
    public ResponseEntity<Accounts> getAccountById(@PathVariable Long id){
        Accounts account = accountService.getAccountById(id);
        return ResponseEntity.ok(account);
    }
    @PutMapping("/accounts/{id}")
    // Update the account based on ID
    // Implement in the profile -> Show the profile logging in customizing it
    public ResponseEntity<Accounts> updateAccount(@PathVariable Long id, @RequestBody Accounts account) throws AccountNotFoundException {
        return ResponseEntity.ok(accountService.updateAccount(id, account));
    }
}
