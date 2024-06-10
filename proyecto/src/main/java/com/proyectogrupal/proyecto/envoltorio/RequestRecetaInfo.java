package com.proyectogrupal.proyecto.envoltorio;

import org.springframework.http.HttpHeaders;

public class RequestRecetaInfo {
	    private String name;
	    private String type;
	    private int maxCalories;
	    private int minCalories;
	    private String ingredients;
		public String getName() {
			return name;
		}
		public void setName(String name) {
			this.name = name;
		}
		public String getType() {
			return type;
		}
		public void setType(String type) {
			this.type = type;
		}
		public int getMaxCalories() {
			return maxCalories;
		}
		public void setMaxCalories(int maxCalories) {
			this.maxCalories = maxCalories;
		}
		public int getMinCalories() {
			return minCalories;
		}
		public void setMinCalories(int minCalories) {
			this.minCalories = minCalories;
		}
		public String getIngredients() {
			return ingredients;
		}
		public void setIngredients(String ingredients) {
			this.ingredients = ingredients;
		}



}
