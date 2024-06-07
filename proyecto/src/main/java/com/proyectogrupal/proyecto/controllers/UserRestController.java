package com.proyectogrupal.proyecto.controllers;

import java.io.Console;
import java.util.List;
import java.util.Set;

import javax.swing.text.html.FormSubmitEvent.MethodType;

import org.hibernate.internal.build.AllowSysOut;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


import com.proyectogrupal.proyecto.envoltorio.RequestRecipe;
import com.proyectogrupal.proyecto.envoltorio.RequestUsername;
import com.proyectogrupal.proyecto.envoltorio.RequestUsernameRequestRecipe;
import com.proyectogrupal.proyecto.envoltorio.UserRequest;
import com.proyectogrupal.proyecto.models.dao.IRecipeDao;

import com.proyectogrupal.proyecto.models.dao.IUserDao;
import com.proyectogrupal.proyecto.models.entity.Alergen;
import com.proyectogrupal.proyecto.models.entity.Recipe;
import com.proyectogrupal.proyecto.models.entity.User;
import com.proyectogrupal.proyecto.models.services.IUserService;

import jakarta.servlet.http.Cookie;

@CrossOrigin(origins = {"http://localhost:4200"} , methods = {RequestMethod.POST,RequestMethod.GET})
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
	
	@PostMapping("/alergens")
	public Set<Alergen> getAler(@RequestBody RequestUsername request){
		return userService.findByUsername(request.getUsername()).getAlergens();
	}
	
	@PostMapping("/user")
	public User getUser(@RequestBody RequestUsername request) {
		return userService.findByUsername(request.getUsername());
	}
	
	@PostMapping("/update")
	public User updateUser(@RequestBody UserRequest ur) {
		return userService.editUser(ur);
	}
	
	@PostMapping("/addRecipe")
	public User markAsDone(@RequestBody RequestUsernameRequestRecipe request) {
		RequestUsername restUser = request.getRequestedUsername();
		RequestRecipe restRecipe = request.getRequestedRecipe();
		return userService.markAsDone(restRecipe, restUser);
	}
	
	@PostMapping("/getRecipesDone")
	@Transactional
	public Set<Recipe> getRecipesDone(@RequestBody RequestUsername userName) {
		return userService.getRecipesDone(userName);
	}
	
	@PostMapping("/setFavRecipe")
	public User markAsfav(@RequestBody RequestUsernameRequestRecipe request) {
		RequestUsername restUser = request.getRequestedUsername();
		RequestRecipe restRecipe = request.getRequestedRecipe();
		return userService.markAsFav(restRecipe, restUser);
	}
	
	@PostMapping("/getRecipesFav")
	@Transactional
	public Set<Recipe> getRecipesFav(@RequestBody RequestUsername userName) {
		return userService.getRecipesFav(userName);
	}
	
}
