import { Ingredient } from './../shared/indgredient.model';
export class Recipe{
    name: string;
    desc: string;
    imgURL: string;
    ingredients: Ingredient[];

    constructor(name:string,desc:string,imgURL:string,ingredients:Ingredient[]){

        this.name = name;
        this.desc = desc;
        this.imgURL = imgURL;
        this.ingredients = ingredients
    }
}