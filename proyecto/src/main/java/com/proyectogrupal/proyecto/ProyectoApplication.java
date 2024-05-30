package com.proyectogrupal.proyecto;

import java.util.stream.Stream;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.proyectogrupal.proyecto.model.dao.IUserDao;
import com.proyectogrupal.proyecto.model.entity.User;

@SpringBootApplication
public class ProyectoApplication {

    public static void main(String[] args) {
        SpringApplication.run(ProyectoApplication.class, args);
    }

    @Bean
    CommandLineRunner init(IUserDao userRepository) {
        return args -> {
            if (userRepository.count() == 0) {
                System.out.println("No se encontraron usuarios en la base de datos.");
            } else {
                System.out.println("Usuarios existentes:");
                userRepository.findAll().forEach(System.out::println);
            }
        };
    }

}
