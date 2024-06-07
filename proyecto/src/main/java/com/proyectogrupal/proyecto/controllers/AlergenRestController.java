package com.proyectogrupal.proyecto.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.proyectogrupal.proyecto.models.dao.IAlergenDao;
import com.proyectogrupal.proyecto.models.entity.Alergen;
import com.proyectogrupal.proyecto.models.services.AlergenService;
import com.proyectogrupal.proyecto.models.services.IAlergenService;
import com.proyectogrupal.proyecto.models.services.UserService;
@CrossOrigin(origins = {"http://localhost:4200"} , methods = {RequestMethod.POST,RequestMethod.GET})
@RestController
@RequestMapping("/aler")
public class AlergenRestController {
	@Autowired
	private IAlergenService alergenService;
	@Autowired
	private IAlergenDao alerDao;
	
	@GetMapping("/alergenos")
	public List<Alergen> index(){
		return alergenService.findAll();
	}
}
