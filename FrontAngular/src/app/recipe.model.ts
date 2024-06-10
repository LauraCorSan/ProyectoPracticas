export class Recipe {
  constructor(
    public title: string,
    public image: string,
    public summary: string,
    public extendedIngredients: Ingredient[]
  ) {}
}

export class Ingredient{
  constructor(
    public original : string
  ){}
}
