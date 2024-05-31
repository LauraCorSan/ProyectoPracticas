package com.proyectogrupal.proyecto.models.services;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.proyectogrupal.proyecto.models.dao.IAlergenDao;
import com.proyectogrupal.proyecto.models.dao.IUserDao;
import com.proyectogrupal.proyecto.models.entity.Alergen;
import com.proyectogrupal.proyecto.models.entity.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService implements IUserService {
	@Autowired
	private IUserDao userDao;
	@Autowired
	private IAlergenDao alergenDao;
	@Override
	public List<User> findAll() {
		return (List<User>) userDao.findAll();
	}
	@Override
	public User save(User s) {
		return userDao.save(s);
	}
	@Override
	public User findByUsername(String username) {
		return userDao.findByUsername(username);
	}
	@Override
	@Transactional
	public void createUserWithCourse(User user) {
		Set<Alergen> persistedAlergens = new HashSet<Alergen>();
		for(Alergen aler : user.getAlergens()) {
			Alergen persistedAlergen = alergenDao.findByName(aler.getName());
			
			if(persistedAlergen == null) {
				persistedAlergen = alergenDao.save(aler);
			}
			persistedAlergens.add(persistedAlergen);
		}
		user.setAlergens(persistedAlergens);
		userDao.save(user);
	}
	
}
