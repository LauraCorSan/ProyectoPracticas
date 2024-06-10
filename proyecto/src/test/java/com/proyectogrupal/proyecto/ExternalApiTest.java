package com.proyectogrupal.proyecto;

import com.google.gson.JsonSyntaxException;
import com.google.gson.JsonObject;
import com.google.gson.JsonArray;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.proyectogrupal.proyecto.envoltorio.RequestUsername;
import com.proyectogrupal.proyecto.models.dao.IAlergenDao;
import com.proyectogrupal.proyecto.models.dao.IUserDao;
import com.proyectogrupal.proyecto.models.entity.Alergen;
import com.proyectogrupal.proyecto.models.entity.User;
import com.proyectogrupal.proyecto.models.services.ExternalApiService;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class ExternalApiTest {

    @Mock
    private RestTemplate restTemplate;

    @Mock
    private Gson gson;

    @InjectMocks
    private ExternalApiService externalApi;
    

    @Test
    void testCallExternalApi_JsonSyntaxException() {
        String url = "https://api.spoonacular.com/recipes/complexSearch";
        String apiKey = "e92ce92eb2d846418968a9f01f8871ec";;
        String malformedJson = "{invalidJson}";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", apiKey);

        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(url).queryParam("apiKey", apiKey);
        HttpEntity<?> entity = new HttpEntity<>(headers);

        ResponseEntity<String> responseEntity = ResponseEntity.ok(malformedJson);

        when(restTemplate.exchange(anyString(), any(HttpMethod.class), any(HttpEntity.class), any(Class.class)))
                .thenReturn(responseEntity);

        when(gson.fromJson(malformedJson, JsonObject.class)).thenThrow(new JsonSyntaxException("Malformed JSON"));

        List<Map<String, Object>> result = externalApi.callExternalApi();
        assertEquals(1, result.size());
        assertEquals("Error processing the JSON response", result.get(0).get("error"));
    }
}