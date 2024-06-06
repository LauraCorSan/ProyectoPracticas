package com.proyectogrupal.proyecto.models.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import com.proyectogrupal.proyecto.models.entity.Alergen;

public interface IAlergenDao extends JpaRepository<Alergen, Long>{
	public Alergen findByName(String name);
}
