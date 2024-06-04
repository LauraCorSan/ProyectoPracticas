package com.proyectogrupal.proyecto.models.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.proyectogrupal.proyecto.models.entity.Cuisine;

public interface ICuisineDao extends JpaRepository<Cuisine, Long>{
	
}
