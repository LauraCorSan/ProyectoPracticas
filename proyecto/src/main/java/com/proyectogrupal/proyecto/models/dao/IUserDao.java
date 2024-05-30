package com.proyectogrupal.proyecto.models.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.web.bind.annotation.RequestMapping;

import com.proyectogrupal.proyecto.models.entity.User;

public interface IUserDao extends JpaRepository<User, Long>{
	List<User> findByUsername(String username);
}
