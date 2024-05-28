package com.proyectogrupal.proyecto.controllers;

import java.io.Console;
import java.util.List;

import org.hibernate.internal.build.AllowSysOut;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.proyectogrupal.proyecto.models.entity.User;
import com.proyectogrupal.proyecto.models.services.IUserService;

@RestController
@RequestMapping("/api")
public class UserRestController {

	@Autowired
	private IUserService userService;
	
	@GetMapping("/clientes")
	public List<User> index() {
		return userService.findAll();
	}
}
