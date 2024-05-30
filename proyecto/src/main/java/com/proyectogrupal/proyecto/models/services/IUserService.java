package com.proyectogrupal.proyecto.models.services;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.proyectogrupal.proyecto.models.entity.User;

public interface IUserService {

	public List<User> findAll();
	public User save(User s);
	public List<User> findByUsername(String username);
}
