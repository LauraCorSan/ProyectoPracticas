package com.proyectogrupal.proyecto.models.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.proyectogrupal.proyecto.models.entity.Alergen;
import com.proyectogrupal.proyecto.models.entity.Recipe;

public interface IRecipeDao extends JpaRepository<Recipe, Long>{
	public Optional<Recipe> findByrecipeId(Long recipeId);
}
