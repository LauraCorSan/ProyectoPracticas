package com.proyectogrupal.proyecto.controllers;

import com.proyectogrupal.proyecto.models.entity.RecetaInfo;
import com.proyectogrupal.proyecto.models.services.SpoonacularService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/recipe")
public class RecetaController {

    @Autowired
    private SpoonacularService spoonacularService;

    @GetMapping("/api")
    public List<RecetaInfo> buscarRecetas(@RequestParam String params) {
        List<RecetaInfo> recetas = spoonacularService.buscarRecetasComoString(params);
        return recetas;
    }
}
