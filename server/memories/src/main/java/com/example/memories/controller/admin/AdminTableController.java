package com.example.memories.controller.admin;

import com.example.memories.model.Accounts;
import com.example.memories.service.interfaces.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping(value = "/pages")
public class AdminTableController {
    @Autowired
    private AccountService accountService;

    @GetMapping( "/AdminTable")
    public ModelMap mmAdminTable(Model model) {
        List<Accounts> listAccounts=  accountService.getAllAccountsByRoleId(2L);
        model.addAttribute("listAccounts", listAccounts);
        return new ModelMap();
    }

    @GetMapping( "/NewAdmin")
    public ModelMap mmNewAdmin(Model model) {
        return new ModelMap();
    }
}
