package com.proyectogrupal.proyecto.models.entity;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
	Long recipeId;
	String title;
	String url;
	
	@ManyToMany(mappedBy = "recipes", fetch = FetchType.LAZY)
	@JsonIgnore
	private Set<User> users = new HashSet<User>();
	
	@ManyToMany(mappedBy = "recipesFav", fetch = FetchType.LAZY)
	@JsonIgnore
	private Set<User> usersFav = new HashSet<User>();

	private Long getId() {
		return id;
	}

	private void setId(Long id) {
		this.id = id;
	}

	public Long getRecipeId() {
		return recipeId;
	}

	public void setRecipeId(Long recipeId) {
		this.recipeId = recipeId;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}
	

}
