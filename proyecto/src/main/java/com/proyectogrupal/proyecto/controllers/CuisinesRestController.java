package com.proyectogrupal.proyecto.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.proyectogrupal.proyecto.models.entity.Cuisine;
import com.proyectogrupal.proyecto.models.services.CuisineService;

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
