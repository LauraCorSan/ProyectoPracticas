package com.proyectogrupal.proyecto.models.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.web.bind.annotation.RequestMapping;

import com.proyectogrupal.proyecto.models.entity.User;

public interface IUserDao extends CrudRepository<User, Long>{

}
