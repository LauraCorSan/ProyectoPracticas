package com.proyectogrupal.proyecto.models.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.proyectogrupal.proyecto.models.entity.RecetaInfo;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class SpoonacularService {

    @Value("${spoonacular.api.key}")
    private String apiKey;
    private final RestTemplate restTemplate = new RestTemplate();

    public List<RecetaInfo> buscarRecetasComoString(String params) {
        Map<String, String> paramsMap = parseParams(params);
        UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromHttpUrl("https://api.spoonacular.com/recipes/complexSearch")
                .queryParam("apiKey", apiKey);

        for (Map.Entry<String, String> entry : paramsMap.entrySet()) {
            uriBuilder.queryParam(entry.getKey(), entry.getValue());
        }

        String url = uriBuilder.toUriString();
        String response = restTemplate.getForObject(url, String.class);

        JsonObject jsonObject = JsonParser.parseString(response).getAsJsonObject();
        JsonArray resultsArray = jsonObject.getAsJsonArray("results");

        List<RecetaInfo> recetas = new ArrayList<>();
        for (JsonElement element : resultsArray) {
            JsonObject recipeObject = element.getAsJsonObject();
            RecetaInfo receta = new RecetaInfo(recipeObject.get("id").getAsInt(),recipeObject.get("title").getAsString(),recipeObject.get("image").getAsString(),recipeObject.get("imageType").getAsString());
           
            recetas.add(receta);
        }

        return recetas;
    }

    private Map<String, String> parseParams(String params) {
        String[] paramsArray = params.split("&");
        Map<String, String> paramsMap = new HashMap<>();

        for (String param : paramsArray) {
            String[] keyValue = param.split("=");
            if (keyValue.length == 2) {
                paramsMap.put(keyValue[0], keyValue[1]);
            } else {
                throw new IllegalArgumentException("Formato de parámetro de búsqueda inválido: " + param);
            }
        }
        
        return paramsMap;
    }
}
