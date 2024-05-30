package com.proyectogrupal.proyecto.model.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.proyectogrupal.proyecto.model.entity.User;

@Repository
public interface IUserDao extends CrudRepository<User, Long>{}
 
