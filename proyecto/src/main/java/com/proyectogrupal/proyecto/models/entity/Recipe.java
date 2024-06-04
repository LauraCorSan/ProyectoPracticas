package com.proyectogrupal.proyecto.models.entity;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "recipes")
public class Recipe implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	Long id;
	Double recipeId;
	
	@ManyToMany(mappedBy = "recipes", fetch = FetchType.LAZY)
	private Set<User> users = new HashSet<User>();

	private Long getId() {
		return id;
	}

	private void setId(Long id) {
		this.id = id;
	}

	public Double getRecipeId() {
		return recipeId;
	}

	public void setRecipeId(Double recipeId) {
		this.recipeId = recipeId;
	}

}
