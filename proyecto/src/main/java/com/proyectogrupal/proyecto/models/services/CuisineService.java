package com.proyectogrupal.proyecto.models.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.proyectogrupal.proyecto.models.dao.ICuisineDao;
import com.proyectogrupal.proyecto.models.entity.Cuisine;

@Service
public class CuisineService {
	@Autowired
	ICuisineDao cd;
	
	public List<Cuisine> findAll(){
		return cd.findAll();
	}
}
