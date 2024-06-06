package com.proyectogrupal.proyecto;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;
import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import com.proyectogrupal.proyecto.controllers.AlergenRestController;
import com.proyectogrupal.proyecto.controllers.CuisinesRestController;
import com.proyectogrupal.proyecto.controllers.RecipesRestController;
import com.proyectogrupal.proyecto.controllers.UserRestController;
import com.proyectogrupal.proyecto.envoltorio.RequestRecipe;
import com.proyectogrupal.proyecto.envoltorio.RequestUsername;
import com.proyectogrupal.proyecto.envoltorio.RequestUsernameRequestRecipe;
import com.proyectogrupal.proyecto.models.dao.IAlergenDao;
import com.proyectogrupal.proyecto.models.dao.IUserDao;
import com.proyectogrupal.proyecto.models.entity.Alergen;
import com.proyectogrupal.proyecto.models.entity.Recipe;
import com.proyectogrupal.proyecto.models.entity.User;
import com.proyectogrupal.proyecto.models.services.IUserService;
import com.proyectogrupal.proyecto.models.services.UserService;

@RunWith(SpringRunner.class)
@SpringBootTest
class ProyectoApplicationTests {
	@Autowired
	UserRestController urc;
	@Autowired
	RecipesRestController rrp;
	@Autowired
	CuisinesRestController crp;
	@Autowired
	AlergenRestController arp;
	@Autowired
	UserService userService;
	
	@Autowired
	IAlergenDao alerDao;
	
	Set<Alergen> alergens;
	
	@BeforeEach
	void setup() {
		alergens = new HashSet<Alergen>();
	}
	
	@Test
	public void testMixed() {
		User u1 = new User();
		u1.setName("Arturo");
		u1.setPassword("1234");
		u1.setEmail("arturo@metrica.es");
		u1.setUsername("arturoyz");
		u1.setSurname("Yanez");
		
		assertTrue(alergens.add(alerDao.findByName("Egg")));
		assertTrue(alergens.add(alerDao.findByName("Dairy")));
		
		u1.setAlergens(alergens);
		urc.createUser(u1);
		
		List<User> users = urc.index();
		assertEquals(1, users.size());
		RequestUsername ru = new RequestUsername();
		ru.setUsername("arturoyz");
		assertEquals(urc.getUser(ru).getUsername(), "arturoyz");
		//Devuelve false pues falta la contraseña
		assertFalse(urc.isValidCredentials(ru));
		ru.setPassword("1234");
		//Devuelve true por que son credenciales validas
		assertTrue(urc.isValidCredentials(ru));
	}
	
	@Test
	public void testCredentials() {
		User u1 = new User();
		u1.setName("Manuel");
		u1.setPassword("1234");
		u1.setEmail("manu@metrica.es");
		u1.setUsername("manugl");
		u1.setSurname("gonzalez");
		urc.createUser(u1);
		RequestUsername ru = new RequestUsername();
		ru.setUsername("manugl");
		ru.setPassword("1234");
		//Devuelve true por que las credenciales son validas puesto que existe un usuario asi 
		assertTrue(urc.isValidCredentials(ru));
		ru.setPassword("123");
		//Devuelve false puesto que la contraseña es incorrecta para ese nombre de usuario
		assertFalse(urc.isValidCredentials(ru));
		ru.setUsername("sarayg");
		//Devuelve false por que el usuario no existe
		assertFalse(urc.isValidCredentials(ru));
	}
	@Test
	@Transactional
	public void testFunctions() {
		List<Map<String,Object>> call = rrp.callExtern();
		assertEquals(call.size(), 10);
		assertEquals(call.get(0).size(),3);
		for(int i = 0;i < 10;i++) {
			assertTrue(call.get(i).containsKey("id"));
			assertTrue(call.get(i).containsKey("title"));
			assertTrue(call.get(i).containsKey("image"));
		}
		assertEquals(crp.index().size(),27);
		assertEquals(arp.index().size(), 12);
	}
	
	@Test
	@Transactional
	void testUserRecipes() {
		User u1 = new User();
		u1.setName("Arturo");
		u1.setPassword("1234");
		u1.setEmail("arturo@metrica.es");
		u1.setUsername("joseyz");
		u1.setSurname("Yanez");
		
		urc.createUser(u1);
		
		RequestUsernameRequestRecipe entrada = new RequestUsernameRequestRecipe();
		RequestRecipe recipe = new RequestRecipe();
		recipe.setRecipeId(12345L);
		recipe.setTitle("Pollo frango");
		recipe.setUrl("Para pollo popeyes");
		RequestUsername username = new RequestUsername();
		username.setUsername("joseyz");
		entrada.setRequestedRecipe(recipe);
		entrada.setRequestedUsername(username);
		u1 = urc.markAsDone(entrada);
		
		assertEquals(u1.getRecipes().size(),1);
		u1 = urc.markAsDone(entrada);
		assertEquals(u1.getRecipes().size(),1);
		username.setUsername("arturoyz");
		entrada.setRequestedUsername(username);
		u1 = urc.markAsDone(entrada);
		assertEquals(u1.getRecipes().size(),1);
		assertEquals(urc.getRecipesDone(username).size(),1);
		assertEquals(rrp.getRegisteredRecipes().size(), 1);
		
		username.setUsername("joseyz");
		entrada.setRequestedUsername(username);
		u1 = urc.markAsfav(entrada);
		
		assertEquals(u1.getRecipesFav().size(),1);
		u1 = urc.markAsfav(entrada);
		assertEquals(u1.getRecipesFav().size(),1);
		
		username.setUsername("arturoyz");
		entrada.setRequestedUsername(username);
		u1 = urc.markAsfav(entrada);
		assertEquals(u1.getRecipesFav().size(),1);
		assertEquals(urc.getRecipesDone(username).size(),1);
		assertEquals(rrp.getRegisteredRecipes().size(), 1);
		
	}
	
	@Test
	 void userChange() {
		
	}
	
	
}
