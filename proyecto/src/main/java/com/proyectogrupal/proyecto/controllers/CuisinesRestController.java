package com.proyectogrupal.proyecto.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.proyectogrupal.proyecto.models.entity.Cuisine;
import com.proyectogrupal.proyecto.models.services.CuisineService;
@CrossOrigin(origins = {"http://localhost:4200"} , methods = {RequestMethod.POST,RequestMethod.GET})
@RestController
@RequestMapping("/cuisine")
public class CuisinesRestController {
	@Autowired
	CuisineService sc;
	
	@GetMapping("/getAll")
	public List<Cuisine> index(){
		return sc.findAll();
	}
}
