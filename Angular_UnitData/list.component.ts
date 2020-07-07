/**
 * Component for listing units
 */
import { Component } from '@angular/core';
import { UnitService, Unit } from './unit.service';
@Component({
  templateUrl: './list.component.html',
  styleUrls: [`./app.component.css`]
})
export class ListComponent { 
  units: Unit[];
  constructor(unitService: UnitService) {
    this.units = unitService.getUnits();
  }
}

