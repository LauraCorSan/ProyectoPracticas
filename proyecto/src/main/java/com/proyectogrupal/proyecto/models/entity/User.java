package com.proyectogrupal.proyecto.models.entity;

import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import org.springframework.transaction.annotation.Transactional;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinColumns;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
@Table(name = "users")
public class User implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String name;
	private String surname;
	private String email;
	private String username;
	private String password;
	@Column(name = "date_of_bith")
	@Temporal(TemporalType.DATE)
	private Date dateOfBirth;
	@Column(name = "create_at")
	@Temporal(TemporalType.DATE)
	private Date registrationDate;

	@ManyToMany(cascade = {CascadeType.PERSIST , CascadeType.MERGE},fetch = FetchType.LAZY)
	@JoinTable(name = "User_Alergen", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "alergen_id"))
	private Set<Alergen> alergens = new HashSet<>();

	@ManyToMany(cascade = {CascadeType.PERSIST , CascadeType.MERGE})
	@JoinTable(name = "recipes_made", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "recipe_id"))
	private Set<Recipe> recipes = new HashSet<>();
	
	@ManyToMany(cascade = {CascadeType.PERSIST , CascadeType.MERGE})
	@JoinTable(name = "recipes_favourite", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "recipe_id"))
	private Set<Recipe> recipesFav = new HashSet<>();

	private Long getId() {
		return id;
	}

	private void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSurname() {
		return surname;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Date getDateOfBirth() {
		return dateOfBirth;
	}

	public void setDateOfBirth(Date dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}

	public Date getRegistrationDate() {
		return registrationDate;
	}

	public void setRegistrationDate(Date registrationDate) {
		this.registrationDate = new Date();
	}
	
	@Transactional
	public Set<Alergen> getAlergens() {
		return alergens;
	}
	
	public void setAlergens(Set<Alergen> alergens) {
		this.alergens = alergens;
	}
	public Set<Recipe> getRecipes() {
		return recipes;
	}

	public void setRecipes(Set<Recipe> recipes) {
		this.recipes = recipes;
	}
	
	
	
	public Set<Recipe> getRecipesFav() {
		return recipesFav;
	}

	public void setRecipesFav(Set<Recipe> recipesFav) {
		this.recipesFav = recipesFav;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", name=" + name + ", surname=" + surname + ", email=" + email + ", username="
				+ username + ", password=" + password + ", dateOfBirth=" + dateOfBirth + ", registrationDate="
				+ registrationDate + "]";
	}

}
