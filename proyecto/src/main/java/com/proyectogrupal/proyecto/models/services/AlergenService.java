package com.proyectogrupal.proyecto.models.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.proyectogrupal.proyecto.models.dao.IAlergenDao;
import com.proyectogrupal.proyecto.models.entity.Alergen;

@Service
public class AlergenService implements IAlergenService{
	@Autowired
	private IAlergenDao alergenDao;
	@Override
	public List<Alergen> findAll() {
		return (List<Alergen>) alergenDao.findAll();
	}
	
}
