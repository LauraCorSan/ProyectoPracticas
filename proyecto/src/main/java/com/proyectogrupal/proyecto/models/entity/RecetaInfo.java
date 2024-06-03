package com.proyectogrupal.proyecto.models.entity;

public class RecetaInfo {
    private int id;
    private String title;
    private String image;
    private String imageType;

    // Getters y Setters
    public int getId() {
        return id;
    }
    public RecetaInfo(int id, String title, String image, String imageType) {
        this.id = id;
        this.title = title;
        this.image = image;
        this.imageType = imageType;
    }
    public void setId(int id) {
        this.id = id;
    }

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

    public String getImageType() {
        return imageType;
    }

    public void setImageType(String imageType) {
        this.imageType = imageType;
    }
    
    public boolean equals(Object o) {
        if (o == null || this.getClass() != o.getClass()) return false;

        RecetaInfo receta = (RecetaInfo) o;

        if (this.id != receta.id) return false;
        if (!this.title.equals(receta.title)) return false;
        if (!this.image.equals(receta.image)) return false;
        return imageType.equals(receta.imageType);
    }
}
