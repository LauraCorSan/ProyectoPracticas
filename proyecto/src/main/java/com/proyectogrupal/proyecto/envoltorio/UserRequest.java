package com.proyectogrupal.proyecto.envoltorio;

import java.util.Date;
import java.util.Set;

import com.proyectogrupal.proyecto.models.entity.Alergen;

public class UserRequest {
	private String name;
	private String surname;
	private String email;
	private String username;
	private String password;
	private Date dateOfBirth;
	private Set<Alergen> alergens;

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

	public Set<Alergen> getAlergens() {
		return alergens;
	}

	public void setAlergens(Set<Alergen> alergens) {
		this.alergens = alergens;
	}
	
	

}
