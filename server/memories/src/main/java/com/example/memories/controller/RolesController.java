package com.example.memories.controller;

import com.example.memories.exeption.RoleNotFoundException;
import com.example.memories.model.Roles;
import com.example.memories.service.interfaces.RoleService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/*
    @author Anh Dung
 */
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class RolesController {
    @Autowired
    private final RoleService roleService;

    public RolesController(RoleService roleService){
        this.roleService = roleService;
    }
    @PostMapping("/role")
    public ResponseEntity<Roles> createRole(@RequestBody Roles role) throws Exception {
        return ResponseEntity.ok(roleService.createRole(role));
    }
    @GetMapping("/role")
    public ResponseEntity<List<Roles>> getAllRoles() {
        return ResponseEntity.ok(roleService.getAllRoles());
    }
    @DeleteMapping("/role/{id}")
    public ResponseEntity<Map<String,Boolean>> deleteRole(@PathVariable Long id) throws RoleNotFoundException {
        boolean deleted = roleService.deleteRole(id);
        Map<String,Boolean> response = new HashMap<>();
        response.put("deleted", deleted);
        return ResponseEntity.ok(response);
    }
    @GetMapping("/role/{id}")
    public ResponseEntity<Roles> getRoleById(@PathVariable Long id) throws RoleNotFoundException{
        Roles role = roleService.getRoleById(id);
        return ResponseEntity.ok(role);
    }
    @PutMapping("/role/{id}")
    public ResponseEntity<Roles> updateRole(@PathVariable Long id, @Valid @RequestBody Roles role) throws RoleNotFoundException {
        return ResponseEntity.ok(roleService.updateRole(id, role));
    }
}
