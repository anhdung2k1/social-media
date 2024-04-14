package com.example.memories.controller.admin;

import com.example.memories.model.Accounts;
import com.example.memories.service.interfaces.AccountService;
import com.example.memories.service.interfaces.PostService;
import com.example.memories.service.interfaces.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.relational.core.sql.In;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;

@Controller
@RequestMapping(value = "pages")
public class DashboardController {

    @Autowired
    PostService postService;
    @Autowired
    AccountService accountService;

    private static final Random RANDOM = new Random(System.currentTimeMillis());

    private final String[] month = {"01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"};
    String[] nameOfMonths = {"January","February","March","April","May","June","July","August","September","October","November","December"};
    @GetMapping( "/dashboard")
    public ModelMap mmDashboard(Model model) {

        Long countPost = postService.countPost();
        Long totalAdminUser = accountService.countAllByRoles(2L);
        Long totalUser = totalAdminUser + accountService.countAllByRoles(1L);
        model.addAttribute("countPost", countPost);
        model.addAttribute("chartData", getChartData());
        model.addAttribute("totalUser", totalUser);
        model.addAttribute("totalAdminUser", totalAdminUser);

        List<Accounts> listAccounts= accountService.getRecentAccountRegister();
        model.addAttribute("listAccounts", listAccounts);
        return new ModelMap();
    }
    private List<List<Object>> getChartData() {
        List<List<Object>> data = new ArrayList<List<Object>>();
        int currentYear = LocalDate.now().getYear();
        int prevYear = currentYear - 1;
        int currentMonth = LocalDate.now().getMonth().getValue();
        if(currentMonth < 12){
            for(int i = currentMonth+1 ;i < 12 ;i++){
                Long countPost = postService.countPostByMonth(String.valueOf(prevYear) + '-' + month[i-1], String.valueOf(prevYear) + '-' + month[i]);
                data.add(List.of(month[i-1] + '/' + prevYear, countPost));
            }
        }
        data.add(List.of(month[11] + '/' + String.valueOf(prevYear),  postService.countPostByMonth(String.valueOf(prevYear) + '-' + month[11], String.valueOf(prevYear) + '-' + month[0])));
        for(int i = 1 ;i < currentMonth + 1 ;i++){
            Long countPost = postService.countPostByMonth(String.valueOf(currentYear) + '-' + month[i-1], String.valueOf(currentYear) + '-' + month[i]);
            data.add(List.of(month[i-1] + '/' + currentYear , countPost));

        }
        for(int i = 0; i< data.size(); i++){
            System.out.println(data.get(i));
        }
        System.out.println(data.size());
        return data;
    }

    @GetMapping( "/table-elements")
    public ModelMap mmTableElements() {
        return new ModelMap();
    }

    @GetMapping( "/form-elements")
    public ModelMap mmFormElements() {
        return new ModelMap();
    }

}