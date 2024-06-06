package com.proyectogrupal.proyecto.models.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.web.bind.annotation.RequestMapping;

import com.proyectogrupal.proyecto.models.entity.User;
/*
 * Esta interfaz debe ser utilizada siempre que se hagan operciones sobre la entidad usuario
 * */
public interface IUserDao extends JpaRepository<User, Long>{
	/*
	 * Metodo para encontrar un usuario por su nombre , se encarga JPA de hacer la
	 * consulta a traves de su propia convencion de nombres
	 */
	User findByUsername(String username);
}
