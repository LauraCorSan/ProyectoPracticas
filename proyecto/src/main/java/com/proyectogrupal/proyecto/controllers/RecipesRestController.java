package com.proyectogrupal.proyecto.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.proyectogrupal.proyecto.models.services.ExternalApiService;

@RestController
@RequestMapping("/recipes")
public class RecipesRestController {
	@Autowired
	private ExternalApiService extern;
	
	
	@GetMapping("/getAll")
	public ResponseEntity<String> callExtern() {
		return extern.callExternalApi();
	}
}
