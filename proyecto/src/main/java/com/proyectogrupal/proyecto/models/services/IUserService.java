package com.proyectogrupal.proyecto.models.services;

import java.util.List;
import java.util.Set;

import org.springframework.data.repository.CrudRepository;

import com.proyectogrupal.proyecto.envoltorio.RequestRecipe;
import com.proyectogrupal.proyecto.envoltorio.RequestUsername;
import com.proyectogrupal.proyecto.envoltorio.UserRequest;
import com.proyectogrupal.proyecto.models.entity.Recipe;
import com.proyectogrupal.proyecto.models.entity.User;

public interface IUserService {
	/*
	 * Metodo para extraer todos los usuarios de la tabla Usuarios
	 */
	public List<User> findAll();

	/*
	 * Metodo para encontrar un usuario por su nombre , se encarga JPA de hacer la
	 * consulta a traves de su propia convencion de nombres
	 */
	public User findByUsername(String username);
	
	/*
	 * Metodo para añadir usuarios y asociarlos con sus alergenos
	 */
	public void createUserWithCourse(User user);
	/*
	 * Metodo para modificar el usuario segun los parametros pasados
	 */
	public User editUser(UserRequest ur);
	
	public User markAsDone(RequestRecipe rr , RequestUsername ru);
	
	public  Set<Recipe> getRecipesDone(RequestUsername user);
	
	public User markAsFav(RequestRecipe rr , RequestUsername ru);
	
	public Set<Recipe> getRecipesFav(RequestUsername user);
}
