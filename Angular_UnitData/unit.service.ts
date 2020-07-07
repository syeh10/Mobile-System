/**
 * This servirce is responsible for provid unit data
 */
import { Injectable } from '@angular/core';
export interface Unit {// A interface to describe the shape of unit.
    code: string;
    name: string;
    session?: string;//optional property
    level?: string;//optional property
    enrolments?: string//optional property
}

/**
 * Injectable decorator dependency on components
 */
@Injectable()
export class UnitService{
	public units: Unit[] = [
		// add data
    { code: "CSC73010", name: "Programming Mobile Systems",session: "Session 1", level: "Advanced", enrolments: "150"},
    { code: "CMP73001", name: "Cybersecurity Management", session: "Session 1", level: "Introductory", enrolments: "200" }
	];
	
	/**
	 * add unit
	 * @param unit 
	 */
	public doAdd ( unit : Unit){
		this.units[this.units.length]= unit;
	}

	/**
	 * Check if a unit already exists
	 * @param unitCode 
	 */
	public isExist (unitCode : string) : boolean {
		for (let i=0; i < this.units.length ; i++){
			if (this.units[i].code == unitCode){
				return true;
			}
		}
		return false;
	}

	/**
	 * Listing all units in Unit array
	 */
	public getUnits() : Unit[] {
		return this.units;
	}

	/**
	 * Get total records
	 */
	public getTotalRecords(): number{
		return this.units.length;
	}
  
}