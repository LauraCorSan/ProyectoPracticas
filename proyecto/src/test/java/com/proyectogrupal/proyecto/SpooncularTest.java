package com.proyectogrupal.proyecto;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.proyectogrupal.proyecto.envoltorio.RequestRecetaInfo;
import com.proyectogrupal.proyecto.models.services.ExternalApiService;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class SpooncularTest {

    @Mock
    private RestTemplate restTemplate;

    @InjectMocks
    private ExternalApiService externalApi;

    @Test
    void buscarRecetas_conParametrosValidos_debeRetornarRecetas() {
        String url = "https://api.spoonacular.com/recipes/complexSearch";
        String apiKey = "e92ce92eb2d846418968a9f01f8871ec";

        RequestRecetaInfo requestRecetaInfo = new RequestRecetaInfo();
        requestRecetaInfo.setName("Spaghetti Carbonara");
        requestRecetaInfo.setType("Pasta");
        requestRecetaInfo.setMaxCalories(800);
        requestRecetaInfo.setMinCalories(200);
        requestRecetaInfo.setIngredients("pasta, bacon, eggs, parmesan cheese");

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", apiKey);

        UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromHttpUrl(url)
                .queryParam("apiKey", apiKey)
                .queryParam("titleMatch", requestRecetaInfo.getName())
                .queryParam("query", requestRecetaInfo.getType())
                .queryParam("maxCalories", String.valueOf(requestRecetaInfo.getMaxCalories()))
                .queryParam("minCalories", String.valueOf(requestRecetaInfo.getMinCalories()))
                .queryParam("includeIngredients", requestRecetaInfo.getIngredients());

        HttpEntity<?> entity = new HttpEntity<>(headers);

        List<Map<String, Object>> expectedList = new ArrayList<>();

        Map<String, Object> recipe1 = new HashMap<>();
        recipe1.put("image", "https://img.spoonacular.com/recipes/1506695-312x231.jpg");
        recipe1.put("id", 1506695);
        recipe1.put("title", "Easy Baked Spaghetti");
        expectedList.add(recipe1);

        Map<String, Object> recipe2 = new HashMap<>();
        recipe2.put("image", "https://img.spoonacular.com/recipes/661094-312x231.jpg");
        recipe2.put("id", 661094);
        recipe2.put("title", "Spicy Eggplant Spaghetti");
        expectedList.add(recipe2);

        Map<String, Object> recipe3 = new HashMap<>();
        recipe3.put("image", "https://img.spoonacular.com/recipes/660835-312x231.jpg");
        recipe3.put("id", 660835);
        recipe3.put("title", "Spaghetti With Pesto Trapanese");
        expectedList.add(recipe3);

        Map<String, Object> recipe4 = new HashMap<>();
        recipe4.put("image", "https://img.spoonacular.com/recipes/660822-312x231.jpg");
        recipe4.put("id", 660822);
        recipe4.put("title", "Spaghetti With Cape Hake Sauce");
        expectedList.add(recipe4);

        Map<String, Object> recipe5 = new HashMap<>();
        recipe5.put("image", "https://img.spoonacular.com/recipes/32579-312x231.jpg");
        recipe5.put("id", 32579);
        recipe5.put("title", "Tuna Spaghetti With Fava Beans");
        expectedList.add(recipe5);

        Map<String, Object> recipe6 = new HashMap<>();
        recipe6.put("image", "https://img.spoonacular.com/recipes/631732-312x231.png");
        recipe6.put("id", 631732);
        recipe6.put("title", "Caponata Style Celery Spaghetti");
        expectedList.add(recipe6);

        Map<String, Object> recipe7 = new HashMap<>();
        recipe7.put("image", "https://img.spoonacular.com/recipes/644192-312x231.jpg");
        recipe7.put("id", 644192);
        recipe7.put("title", "Garden Fresh Tomato Sauce & Spaghetti");
        expectedList.add(recipe7);

        JsonObject jsonResponse = new JsonObject();
        JsonArray resultsArray = new JsonArray();

        expectedList.forEach(recipe -> {
            JsonObject recipeJson = new JsonObject();
            recipeJson.addProperty("id", (Integer) recipe.get("id"));
            recipeJson.addProperty("title", (String) recipe.get("title"));
            recipeJson.addProperty("image", (String) recipe.get("image"));
            resultsArray.add(recipeJson);
        });

        jsonResponse.add("results", resultsArray);

        ResponseEntity<String> responseEntity = ResponseEntity.ok(jsonResponse.toString());

        when(restTemplate.getForObject(anyString(), any(Class.class))).thenReturn(jsonResponse.toString());

        List<Map<String, Object>> result = externalApi.buscarRecetasPorFiltros(requestRecetaInfo);
        assertEquals(expectedList.size(), result.size());
        for (int i = 0; i < expectedList.size(); i++) {
            assertEquals(expectedList.get(i), result.get(i));
        }
    }
}
