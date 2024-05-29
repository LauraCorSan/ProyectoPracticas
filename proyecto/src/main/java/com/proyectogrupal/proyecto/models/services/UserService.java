package com.proyectogrupal.proyecto.models.services;

import java.util.List;

import com.proyectogrupal.proyecto.models.dao.IUserDao;
import com.proyectogrupal.proyecto.models.entity.User;

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
	@Override
	public User save(User s) {
		return userDao.save(s);
	}
	
}
