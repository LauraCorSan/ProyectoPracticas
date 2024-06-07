package com.proyectogrupal.proyecto.models.services;

import java.io.BufferedReader;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.security.Principal;
import java.util.Collection;
import java.util.Enumeration;
import java.util.HashSet;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;

import com.proyectogrupal.proyecto.envoltorio.RequestRecipe;
import com.proyectogrupal.proyecto.envoltorio.RequestUsername;
import com.proyectogrupal.proyecto.envoltorio.UserRequest;
import com.proyectogrupal.proyecto.models.dao.IAlergenDao;
import com.proyectogrupal.proyecto.models.dao.IRecipeDao;
import com.proyectogrupal.proyecto.models.dao.IUserDao;
import com.proyectogrupal.proyecto.models.entity.Alergen;
import com.proyectogrupal.proyecto.models.entity.Recipe;
import com.proyectogrupal.proyecto.models.entity.User;

import jakarta.servlet.AsyncContext;
import jakarta.servlet.DispatcherType;
import jakarta.servlet.RequestDispatcher;
import jakarta.servlet.ServletConnection;
import jakarta.servlet.ServletContext;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletInputStream;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import jakarta.servlet.http.HttpUpgradeHandler;
import jakarta.servlet.http.Part;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserService implements IUserService {
	@Autowired
	private IUserDao userDao;
	@Autowired
	private IAlergenDao alergenDao;
	
	@Autowired 
	private IRecipeDao recipeDao;

	@Override
	public List<User> findAll() {
		return (List<User>) userDao.findAll();
	}

	@Override
	public User findByUsername(String username) {
		return userDao.findByUsername(username);
	}

	@Override
	@Transactional
	public void createUserWithCourse(User user) {
		Set<Alergen> persistedAlergens = new HashSet<Alergen>();
		for (Alergen aler : user.getAlergens()) {
			Alergen persistedAlergen = alergenDao.findByName(aler.getName());

			if (persistedAlergen == null) {
				persistedAlergen = alergenDao.save(aler);
			}
			persistedAlergens.add(persistedAlergen);
		}
		user.setAlergens(persistedAlergens);
		userDao.save(user);
	}
	
	
	@Override
	public User editUser(UserRequest ur) {
		User usr = userDao.findByUsername(ur.getUsername());
		if (ur.getName() != null) {
			usr.setName(ur.getName());
		}

		if (ur.getEmail() != null) {
			usr.setEmail(ur.getEmail());
		}

		if (ur.getPassword() != null) {
			usr.setPassword(ur.getPassword());
		}
		
		if(ur.getUsername() != null) {
			usr.setUsername(ur.getUsername());
		}
		
		if(ur.getSurname() != null) {
			usr.setSurname(ur.getSurname());
		}
		
		if(ur.getDateOfBirth() != null) {
			usr.setDateOfBirth(ur.getDateOfBirth());
		}
		
		if(ur.getAlergens() != null && !ur.getAlergens().isEmpty()) {
			Set<Alergen> alergens = new HashSet<>();
			for(Alergen aler:ur.getAlergens()) {
				alergens.add(alergenDao.findByName(aler.getName()));
			}
			usr.setAlergens(alergens);
		}else {
			usr.setAlergens(new HashSet<Alergen>());
		}
		
		return userDao.save(usr);
	}

	@Override
	@Transactional
	public User markAsDone(RequestRecipe re, RequestUsername ru) {
		Recipe recipe;
		User user = userDao.findByUsername(ru.getUsername());
		Set<Recipe> persistedRecipes = user.getRecipes();
		
		if(recipeDao.findByrecipeId(re.getRecipeId()).isPresent()) { 
			recipe = recipeDao.findByrecipeId(re.getRecipeId()).get();
		}else {
			recipe = new Recipe();
			recipe.setRecipeId(re.getRecipeId());
			recipe.setTitle(re.getTitle());
			recipe.setUrl(re.getUrl());
			recipeDao.save(recipe);
		}
		
		
		if(!persistedRecipes.add(recipe)) {
			user.setRecipes(persistedRecipes);
		}
		
		return userDao.save(user);
	}

	@Override
	@Transactional
	public Set<Recipe> getRecipesDone(RequestUsername user) {
		return userDao.findByUsername(user.getUsername()).getRecipes();
	}
	

	@Override
	@Transactional
	public User markAsFav(RequestRecipe re, RequestUsername ru) {
		Recipe recipe;
		User user = userDao.findByUsername(ru.getUsername());
		Set<Recipe> persistedRecipes = user.getRecipesFav();
		
		if(recipeDao.findByrecipeId(re.getRecipeId()).isPresent()) { 
			recipe = recipeDao.findByrecipeId(re.getRecipeId()).get();
		}else {
			recipe = new Recipe();
			recipe.setRecipeId(re.getRecipeId());
			recipe.setTitle(re.getTitle());
			recipe.setUrl(re.getUrl());
			recipeDao.save(recipe);
		}
		
		
		if(!persistedRecipes.add(recipe)) {
			user.setRecipesFav(persistedRecipes);
		}
		
		return userDao.save(user);
	}
	
	@Override
	@Transactional
	public Set<Recipe> getRecipesFav(RequestUsername user) {
		return userDao.findByUsername(user.getUsername()).getRecipesFav();
	}
	
	

}
