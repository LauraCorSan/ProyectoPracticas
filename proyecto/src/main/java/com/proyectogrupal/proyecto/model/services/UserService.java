package com.proyectogrupal.proyecto.model.services;

import java.util.List;
import java.util.Optional;

import com.proyectogrupal.proyecto.model.dao.IUserDao;
import com.proyectogrupal.proyecto.model.entity.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService implements IUserService {
	@Autowired
	private IUserDao userDao;
	@Override
	public List<User> findAll() {
		return (List<User>) userDao.findAll();
	}
	    public Optional<User> findById(Long id) {
	        Optional<User> userOptional = userDao.findById(id);
	        return userOptional;
	    }
	
}