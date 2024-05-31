package com.proyectogrupal.proyecto.controllers;

import java.io.Console;
import java.util.List;
import java.util.Set;

import javax.swing.text.html.FormSubmitEvent.MethodType;

import org.hibernate.internal.build.AllowSysOut;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.proyectogrupal.proyecto.models.dao.IUserDao;
import com.proyectogrupal.proyecto.models.entity.Alergen;
import com.proyectogrupal.proyecto.models.entity.User;
import com.proyectogrupal.proyecto.models.services.IUserService;

@CrossOrigin(origins = {"http://localhost:4200"} , methods = RequestMethod.POST)
@RestController
@RequestMapping("/api")
public class UserRestController {

	@Autowired
	private IUserService userService;
	
	@GetMapping("/users")
	public List<User> index() {
		return userService.findAll();
	}
	
	@PostMapping("/create")
	public boolean createUser(@RequestBody User user) {
		RequestUsername ru = new RequestUsername();
		ru.username = user.getUsername();
		if(getUser(ru) == null) {
			userService.createUserWithCourse(user);
			return true;
		}else return false;
	}
	
	@PostMapping("/login")
	public boolean isValidCredentials(@RequestBody RequestUsername request) {
		if((getUser(request) != null)) {
			User u = getUser(request);
			return u.getPassword().equals(request.getPassword());
		}
		return false;
	}
	
	@GetMapping("/alergens")
	public Set<Alergen> getAler(){
		return userService.findByUsername("Pepe").getAlergens();
	}
	
	@PostMapping("/user")
	public User getUser(@RequestBody RequestUsername request) {
		return userService.findByUsername(request.getUsername());
	}
	
	
}
