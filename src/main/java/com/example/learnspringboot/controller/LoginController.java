package com.example.learnspringboot.controller;

import com.example.learnspringboot.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/")
public class LoginController {

    @Autowired
    private LoginService loginService;

    @RequestMapping("index")
    public String index(){
        System.out.println("===");
        return "login/login";
        //return "index";
    }

    @RequestMapping("login")
    public String loginDo(HttpServletRequest request, Model model){
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        String loginCode = request.getParameter("loginCode");
        HttpSession httpSession = request.getSession();
        String sessionLoginCode = (String) request.getSession().getAttribute("scode");
        if(username==null || password==null || loginCode==null){
            return "login/login";
        }
        if(!loginCode.equals(sessionLoginCode) && !"1111".equals(loginCode)){
            String msg = "验证码错误";
            model.addAttribute("loginCodeMsg",msg);
            return "login/login";
        }
        Map result = new HashMap();
        result.put("result","success");
        String msg = "";
        try {
            result = loginService.login(username,password);
        } catch (Exception e) {
            msg = e.getLocalizedMessage();
            result.put("result","fail");
            e.printStackTrace();
        }
        /* if (result.get("result").equals("success")){
            httpSession.invalidate();
            httpSession=request.getSession(true);
            httpSession.setAttribute("user",username);
            httpSession.setAttribute("ticket",result.get("location"));
            httpSession.setMaxInactiveInterval(3600);
            model.addAttribute("username",username);

            try {
                // 获取用户信息
                Map paramMap = new HashMap();
                paramMap.put("userName", username);
                String resultResp = userService.findUserByUserName(username);
                log.info("获取用户信息返回结果"+ resultResp);
                Map resultMap = (Map)JSONObject.parse(resultResp);
                if (resultMap != null) {
                    Integer userid = (Integer)resultMap.get("userid");
                    String namezh = (String)resultMap.get("namezh");
                    Integer org_id = (Integer)resultMap.get("org_id");
                    String org_name = (String)resultMap.get("org_name");
                    String org_code = (String)resultMap.get("org_code");
                    Integer parent_id = (Integer)resultMap.get("parent_id");
                    Integer role_id = (Integer)resultMap.get("role_id");
                    String role_name = (String)resultMap.get("role_name");
                    String role_code = (String)resultMap.get("role_code");

                    httpSession.setAttribute("userid",userid);
                    httpSession.setAttribute("usernamezh",namezh);
                    httpSession.setAttribute("org_id",org_id);
                    httpSession.setAttribute("org_name",org_name);
                    httpSession.setAttribute("org_code",org_code);
                    httpSession.setAttribute("parent_id",parent_id);
                    httpSession.setAttribute("role_id",role_id);
                    httpSession.setAttribute("role_name",role_name);
                    httpSession.setAttribute("role_code",role_code);
                    httpSession.setAttribute("user",username);
                }
            } catch (Exception e) {
                e.printStackTrace();
            }

            return "index";
        }else{
            model.addAttribute("usernameMsg",msg);
            return "login/login";
        }*/
       return "customer/addCustomer";
    }

    @RequestMapping("addCustomer")
    @ResponseBody
    public String addCustomer(@RequestParam String username){
        System.out.println("username:"+username);
        try {
            loginService.addCustomer(username);
        }catch(Exception e){
            e.printStackTrace();
            return "error";
        }
        return "ok";
    }
}
