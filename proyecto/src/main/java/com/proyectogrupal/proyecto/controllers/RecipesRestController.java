package com.proyectogrupal.proyecto.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.JsonObject;
import com.proyectogrupal.proyecto.models.services.ExternalApiService;
@CrossOrigin(origins = {"http://localhost:4200"} , methods = {RequestMethod.POST,RequestMethod.GET})
@RestController
@RequestMapping("/recipes")
public class RecipesRestController {
	@Autowired
	private ExternalApiService extern;
	
	
	@GetMapping("/getAll")
	public List<Map<String, Object>> callExtern() {
		return extern.callExternalApi();
	}
}
