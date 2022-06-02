import { Component, OnInit } from '@angular/core';
import { FootballService } from '../football.service';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  countries = ["Uefa", "Spain", "England", "Italy", "France"];
  selectedCountry = "Uefa";

  constructor(private footballService: FootballService) { }

  ngOnInit(): void {

  }

  selectCountry(country:string){
    document.getElementById("button."+this.selectedCountry)!.className = "";
    if (country!="favs") {
      this.footballService.setCurrentCountry(country);
    }
    this.selectedCountry = country;
    document.getElementById("button."+this.selectedCountry)!.className = "active";
  }
}
