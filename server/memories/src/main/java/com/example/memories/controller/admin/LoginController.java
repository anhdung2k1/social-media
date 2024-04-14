package com.example.memories.controller.admin;

import com.example.memories.builder.AuthenticationResponse;
import com.example.memories.exeption.AccountNotFoundException;
import com.example.memories.model.Accounts;
import com.example.memories.service.interfaces.AccountService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/pages")
public class LoginController {

    @Autowired
    AccountService accountService;

    @Autowired
    private HttpServletResponse response;
    @Autowired
    private AuthenticationManager authenticationManager;
    @GetMapping("/login")
    public String showLoginPage(Model model){
        model.addAttribute("account",new Accounts());
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(authentication == null || authentication instanceof AnonymousAuthenticationToken)        {
            return "pages/login";
        }

        return "redirect:/pages/dashboard";
    }
    @PostMapping("/doLogin")
    public String doLogin(Model model, @ModelAttribute Accounts account, BindingResult bindingResult) throws AccountNotFoundException {
        System.out.println("login");
        if(bindingResult.hasErrors()){
            System.out.println("There was a error "+bindingResult);
            System.out.println("Person is: "+ account.getEmail());
            return "pages/login";
        }
        model.addAttribute("account",account);
        AuthenticationResponse authenticationResponse = accountService.authenticate(account);
        Cookie cookie = new Cookie("Authorization", authenticationResponse.getToken());
        response.addCookie(cookie);

        System.out.println(authenticationResponse);
        return "redirect:/pages/dashboard";
    }
}
