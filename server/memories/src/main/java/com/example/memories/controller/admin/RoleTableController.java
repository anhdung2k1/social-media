package com.example.memories.controller.admin;

import com.example.memories.model.Roles;
import com.example.memories.service.interfaces.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping(value ="/pages")
public class RoleTableController {
    @Autowired
    private RoleService roleService;

    @GetMapping( "/RoleTable")
    public ModelMap mmRoleTable(Model model) {
        List<Roles> listRoles=  roleService.getAllRoles();
        model.addAttribute("listRoles", listRoles);
        return new ModelMap();
    }
}
