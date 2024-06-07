package com.proyectogrupal.proyecto.models.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.proyectogrupal.proyecto.models.dao.IRecipeDao;
import com.proyectogrupal.proyecto.models.entity.Recipe;

@Service
public class RecipeService implements IRecipeService{
	@Autowired
	IRecipeDao recipeDao;
	
	public List<Recipe> getRegisteredRecipes() {
		return recipeDao.findAll();
	}
}
