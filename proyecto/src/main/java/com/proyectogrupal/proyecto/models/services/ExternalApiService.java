package com.proyectogrupal.proyecto.models.services;

import java.io.IOException;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonSyntaxException;
import com.google.gson.reflect.TypeToken;
import com.proyectogrupal.proyecto.envoltorio.RequestUsername;
import com.proyectogrupal.proyecto.models.dao.IUserDao;
import com.proyectogrupal.proyecto.models.entity.Alergen;
import com.proyectogrupal.proyecto.models.entity.User;

@Service
public class ExternalApiService {
	@Autowired
	IUserDao userDao;
	@Autowired
	private RestTemplate restTemplate;
	private String apiKey = "e92ce92eb2d846418968a9f01f8871ec";
	private Gson gson = new Gson();

	public List<Map<String, Object>> callExternalApi() {
		String url = "https://api.spoonacular.com/recipes/random?number=10";
		/*
		 * Construye los headers de la llamada a la API para agregar las credenciales
		 */
		HttpHeaders headers = new HttpHeaders();
		headers.set("apiKey", this.apiKey);
		/*
		 * Construyo la url con la API key para que deje acceder a los datos
		 */
		UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(url).queryParam("apiKey", this.apiKey);
		/*
		 * Contruyo una entidad HTTP por que la consume el etodo exchange , contiene los
		 * datos de la cabecera
		 */
		HttpEntity<?> entity = new HttpEntity<>(headers);

		ResponseEntity<String> response = restTemplate.exchange(builder.toUriString(), HttpMethod.GET, entity,
				String.class);

		try {
			JsonObject jsob = gson.fromJson(response.getBody(), JsonObject.class);
			JsonArray recipesArray = jsob.getAsJsonArray("recipes");

			List<Map<String, Object>> formatedResponse = new ArrayList<>();

			for (int i = 0; i < recipesArray.size(); i++) {
				JsonObject recipe = recipesArray.get(i).getAsJsonObject();
				Float id = recipe.get("id").getAsFloat();
				String title = recipe.get("title").getAsString();
				String image = recipe.get("image").getAsString();
				Map<String, Object> recipeMap = new HashMap<String, Object>();
				recipeMap.put("id", id);
				recipeMap.put("title", title);
				recipeMap.put("image", image);
				formatedResponse.add(recipeMap);
			}
			return formatedResponse;
		} catch (JsonSyntaxException e) {
			List<Map<String, Object>> errorResponse = List.of(Map.of("error", "Error processing the JSON response"));
			return errorResponse;
		}
	}
	
	@Transactional
	public List<Map<String, Object>> callExternalApiWithFilters(RequestUsername username) {
		String url = "https://api.spoonacular.com/recipes/random?number=10";
		
		User user = userDao.findByUsername(username.getUsername());
		StringBuilder sb = new StringBuilder();
		sb.append(url).append("&exclude-tags=");
		if(user.getAlergens() != null && !user.getAlergens().isEmpty()) {
			for(Alergen aler : user.getAlergens()) {
				sb.append(aler.getName()).append(",");
			}
			url = sb.toString().substring(0, sb.toString().length() - 1);
		}else {
			return callExternalApi();
		}
		/*
		 * Construye los headers de la llamada a la API para agregar las credenciales
		 */
		HttpHeaders headers = new HttpHeaders();
		headers.set("apiKey", this.apiKey);
		/*
		 * Construyo la url con la API key para que deje acceder a los datos
		 */
		UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(url).queryParam("apiKey", this.apiKey);
		/*
		 * Contruyo una entidad HTTP por que la consume el etodo exchange , contiene los
		 * datos de la cabecera
		 */
		HttpEntity<?> entity = new HttpEntity<>(headers);

		ResponseEntity<String> response = restTemplate.exchange(builder.toUriString(), HttpMethod.GET, entity,
				String.class);

		try {
			JsonObject jsob = gson.fromJson(response.getBody(), JsonObject.class);
			JsonArray recipesArray = jsob.getAsJsonArray("recipes");

			List<Map<String, Object>> formatedResponse = new ArrayList<>();

			for (int i = 0; i < recipesArray.size(); i++) {
				JsonObject recipe = recipesArray.get(i).getAsJsonObject();
				Float id = recipe.get("id").getAsFloat();
				String title = recipe.get("title").getAsString();
				String image = recipe.get("image").getAsString();
				Map<String, Object> recipeMap = new HashMap<String, Object>();
				recipeMap.put("id", id);
				recipeMap.put("title", title);
				recipeMap.put("image", image);
				formatedResponse.add(recipeMap);
			}
			return formatedResponse;
		} catch (JsonSyntaxException e) {
			List<Map<String, Object>> errorResponse = List.of(Map.of("error", "Error processing the JSON response"));
			return errorResponse;
		}
	}
}
