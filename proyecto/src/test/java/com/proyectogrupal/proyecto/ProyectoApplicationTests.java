package com.proyectogrupal.proyecto;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.Date;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.proyectogrupal.proyecto.models.dao.IUserDao;
import com.proyectogrupal.proyecto.models.entity.User;
import com.proyectogrupal.proyecto.models.services.IUserService;

@RunWith(SpringRunner.class)
@SpringBootTest
class ProyectoApplicationTests {
	@Autowired
	IUserDao ud;
	
	@Test
	public void testFindAll() {
		User u1 = new User();
		u1.setName("Arturo");
		u1.setDateOfBirth(new Date());
		u1.setPassword("1234");
		u1.setEmail("arturo@metrica.es");
		u1.setUsername("arturoyz");
		u1.setSurname("Yanez");
		u1.setRegistrationDate(new Date());;
		ud.save(u1);
		
		List<User> users = ud.findAll();
		assertEquals(1, users.size());
	}
}
