package com.proyectogrupal.proyecto.models.services;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.proyectogrupal.proyecto.models.entity.User;

public interface IUserService {
	/*
	 * Metodo para extraer todos los usuarios de la tabla Usuarios
	 */
	public List<User> findAll();

	/*
	 * Metodo para guardar un nuveo usuarios
	 */
	public User save(User s);

	/*
	 * Metodo para encontrar un usuario por su nombre , se encarga JPA de hacer la
	 * consulta a traves de su propia convencion de nombres
	 */
	public User findByUsername(String username);
	
	/*
	 * Metodo para añadir usuarios y asociarlos con sus alergenos
	 */
	public void createUserWithCourse(User user);
}
