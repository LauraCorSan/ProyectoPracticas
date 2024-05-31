package com.proyectogrupal.proyecto.models.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import com.google.gson.JsonObject;

@Service
public class ExternalApiService {
	@Autowired
	private RestTemplate restTemplate;
	private String apiKey = "e92ce92eb2d846418968a9f01f8871ec";

	public ResponseEntity<String> callExternalApi() {
		String url = "https://api.spoonacular.com/recipes/complexSearch";
		/*
		 * Construye los headers de la llamada a la API para agregar las credenciales
		 */
		HttpHeaders headers = new HttpHeaders();
		headers.set("Authotization", this.apiKey);
		/*
		 * Construyo la url con la API key para que deje acceder a los datos
		 */
		UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(url).queryParam("apiKey", this.apiKey);
		/*
		 * Contruyo una entidad HTTP por que la consume el etodo exchange , contiene los
		 * datos de la cabecera
		 */
		HttpEntity<?> entity = new HttpEntity<>(headers);

		return restTemplate.exchange(builder.toUriString(), HttpMethod.GET, entity, String.class);
	}
}
