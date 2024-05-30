package com.proyectogrupal.proyecto.model.services;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.proyectogrupal.proyecto.model.entity.User;

public interface IUserService {

	public List<User> findAll();
}