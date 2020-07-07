/**
 * Component to show a page not found
 */
import { Component } from '@angular/core';
@Component({
  template: `
  <h2>Page not found!</h2>
  <button routerLink="/">Home</button>`
  ,
  styleUrls: [`./app.component.css`]
})
export class PageNotFoundComponent { }
