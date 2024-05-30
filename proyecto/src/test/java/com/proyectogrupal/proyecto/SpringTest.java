package com.proyectogrupal.proyecto;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import static org.junit.jupiter.api.Assertions.assertEquals;

import com.proyectogrupal.proyecto.model.services.UserService;


@ExtendWith(SpringExtension.class)
@SpringBootTest
@TestPropertySource(locations = {"classpath:db-test.properties"})
public class SpringTest {

  @Autowired
  private UserService miservicio;
  @Test
    public void test() {
    
      assertEquals(5,miservicio.findAll().size());
      assertEquals("Pedro",miservicio.findById(2L).orElse(null).getName());
      assertEquals("correo4@example.com",miservicio.findById(3L).orElse(null).getEmail());
      assertEquals(null,miservicio.findById(7L).orElse(null));

    }
 

}