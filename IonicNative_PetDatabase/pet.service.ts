/**
 * This servirce is responsible for provid pet data
 */
import { Injectable } from '@angular/core';
export interface Pet {// A interface to describe the shape of pet.
    name: string;
    species: string;
    age: number;
    sex: string;
    phone: string;
}

/**
 * Injectable decorator dependency on components
 */
@Injectable()
export class PetService{
	public pets: Pet[] = [
		// add data
        {name:"unknow",species:"Snake",age:5,sex:"Male",phone:"12345"},
        {name:"asd",species:"Fish",age:10,sex:"Male",phone:"45678955"},
        {name:"Test",species:"Dog",age:12,sex:"Male",phone:"11"},
        {name:"cheapie",species:"Bird",age:11,sex:"Female",phone:"111"},
        {name:"terry",species:"Dog",age:12,sex:"Male",phone:"0423423422"},
        {name:"Rufus",species:"Dog",age:1,sex:"Male",phone:"12"},
        {name:"qwe",species:"Bird",age:5,sex:"Female",phone:"789456"}
	];
	
	/**
	 * add pet
	 * @param pet 
	 */
	public doAdd ( pet : Pet){
		this.pets[this.pets.length]= pet;
	}

	/**
	 * Check if a pet already exists
	 * @param petName 
	 */
	public isExist (petName : string) : boolean {
		for (let i=0; i < this.pets.length ; i++){
			if (this.pets[i].name == petName){
				return true;
			}
		}
		return false;
	}

	/**
	 * Listing all pets in Pet array
	 */
	public getPets() : Pet[] {
		return this.pets;
	}

	/**
	 * Get total records
	 */
	public getTotalRecords(): number{
		return this.pets.length;
	}
  
}