package com.proyectogrupal.proyecto.envoltorio;

import java.util.List;

import com.google.gson.annotations.SerializedName;

public class RecipeInformation {
	private String title;
    private String image;
    private String summary;
    private List<IngredientInformation> extendedIngredients;
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
	public String getSummary() {
		return summary;
	}
	public void setSummary(String summary) {
		this.summary = summary;
	}
	public List<IngredientInformation> getExtendedIngredients() {
		return extendedIngredients;
	}
	public void setExtendedIngredients(List<IngredientInformation> extendedIngredients) {
		this.extendedIngredients = extendedIngredients;
	}
    
    
}