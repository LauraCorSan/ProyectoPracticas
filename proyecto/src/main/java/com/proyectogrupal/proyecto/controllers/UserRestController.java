package com.proyectogrupal.proyecto.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.proyectogrupal.proyecto.models.entity.User;
import com.proyectogrupal.proyecto.models.services.IUserService;

@CrossOrigin(origins = { "http://localhost:4200" }, methods = { RequestMethod.POST, RequestMethod.GET })
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
		if (getUser(ru).isEmpty()) {
			userService.save(user);
			return true;
		} else
			return false;
	}

	@PostMapping("/login")
	public boolean isRegistered(@RequestBody RequestUsername request) {
		if (!getUser(request).isEmpty()) {
			User u = getUser(request).get(0);
			return u.getPassword().equals(request.getPassword());
		}
		return false;
	}

	@PostMapping("/user")
	public List<User> getUser(@RequestBody RequestUsername request) {
		return userService.findByUsername(request.getUsername());
	}

	static class RequestUsername {
		String username;
		String password;

		public String getUsername() {
			return this.username;
		}

		public String getPassword() {
			return this.password;
		}
	}
}
