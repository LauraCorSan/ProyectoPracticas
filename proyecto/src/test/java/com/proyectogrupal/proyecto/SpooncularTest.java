package com.proyectogrupal.proyecto;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.proyectogrupal.proyecto.controllers.RecetaController;
import com.proyectogrupal.proyecto.models.entity.RecetaInfo;

public class SpooncularTest {
	@Autowired
	RecetaController rc;
	@Test
	public void testRecipes() {

	      List<RecetaInfo> recetas = new ArrayList<>();
	        
	        recetas.add(new RecetaInfo(715495, "Turkey Tomato Cheese Pizza", "https://img.spoonacular.com/recipes/715495-312x231.jpg", "jpg"));
	        recetas.add(new RecetaInfo(715769, "Broccolini Quinoa Pilaf", "https://img.spoonacular.com/recipes/715769-312x231.jpg", "jpg"));
	        recetas.add(new RecetaInfo(715538, "What to make for dinner tonight?? Bruschetta Style Pork & Pasta", "https://img.spoonacular.com/recipes/715538-312x231.jpg", "jpg"));
	        recetas.add(new RecetaInfo(659109, "Salmon Quinoa Risotto", "https://img.spoonacular.com/recipes/659109-312x231.jpg", "jpg"));
	        recetas.add(new RecetaInfo(648279, "Italian Tuna Pasta", "https://img.spoonacular.com/recipes/648279-312x231.jpg", "jpg"));
	        recetas.add(new RecetaInfo(658515, "Roasted Brussels Sprouts With Garlic", "https://img.spoonacular.com/recipes/658515-312x231.jpg", "jpg"));
	        recetas.add(new RecetaInfo(648257, "Italian Steamed Artichokes", "https://img.spoonacular.com/recipes/648257-312x231.jpg", "jpg"));
	        recetas.add(new RecetaInfo(640819, "Crispy Italian Cauliflower Poppers Appetizer", "https://img.spoonacular.com/recipes/640819-312x231.jpg", "jpg"));
	        recetas.add(new RecetaInfo(1095745, "Mushroom Hummus Crostini", "https://img.spoonacular.com/recipes/1095745-312x231.jpg", "jpg"));
	        recetas.add(new RecetaInfo(658753, "Roma Tomato Bruschetta", "https://img.spoonacular.com/recipes/658753-312x231.jpg", "jpg"));

	    


	           assertEquals(recetas,rc.buscarRecetas("cuisine=Italian"));
	           
	           List<RecetaInfo> recetas2 = new ArrayList<>();
	           
	           recetas2.add(new RecetaInfo(631814, "$50,000 Burger", "https://img.spoonacular.com/recipes/631814-312x231.jpg", "jpg"));
	           recetas2.add(new RecetaInfo(642539, "Falafel Burger", "https://img.spoonacular.com/recipes/642539-312x231.png", "png"));
	           recetas2.add(new RecetaInfo(663050, "Tex-Mex Burger", "https://img.spoonacular.com/recipes/663050-312x231.jpg", "jpg"));
	           recetas2.add(new RecetaInfo(622825, "Tortilla Burger Loco Vaca", "https://img.spoonacular.com/recipes/622825-312x231.jpg", "jpg"));
	           recetas2.add(new RecetaInfo(663357, "The Unagi Burger", "https://img.spoonacular.com/recipes/663357-312x231.jpg", "jpg"));
	           recetas2.add(new RecetaInfo(663252, "The Blarney Burger", "https://img.spoonacular.com/recipes/663252-312x231.jpg", "jpg"));
	           recetas2.add(new RecetaInfo(651190, "Masala-Tofu Burger", "https://img.spoonacular.com/recipes/651190-312x231.jpg", "jpg"));
	           recetas2.add(new RecetaInfo(663209, "The Benedict Burger", "https://img.spoonacular.com/recipes/663209-312x231.jpg", "jpg"));
	           recetas2.add(new RecetaInfo(650181, "Little Italy Burger", "https://img.spoonacular.com/recipes/650181-312x231.jpg", "jpg"));
	           recetas2.add(new RecetaInfo(637631, "Cheesy Bacon Burger with Spicy Chipotle Aiolo Sauce", "https://img.spoonacular.com/recipes/637631-312x231.jpg", "jpg"));
	           assertEquals(recetas2,rc.buscarRecetas("query=burger"));


	}
}
