import { Component, Input, OnInit } from '@angular/core';
import { Navigation } from '@angular/router';
import { BehaviorSubject, Observable, Subject, Subscriber } from 'rxjs';
import { FootballService } from '../football.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  currentCountry$ = this.footballService.getCurrentCountryObservable();
  leagues: string[] = [];
  leaguesId: Map<string, number> = new Map<string, number>();
  selectedLeague = "";

  constructor(private footballService: FootballService) { }

  ngOnInit(): void {
    document.getElementById("players")!.className="invisible";
    this.currentCountry$.subscribe(league => this.getLeagues(league));
  }

  getLeagues(country:string) {
    this.leagues = []
    this.leaguesId.clear();
    let cont=0
    this.footballService.getLeagues(country).subscribe(json => {
      for(let league of json.response) {
        if(cont++ >= 5){break;}
        this.leagues.push(league.league.name)
        this.leaguesId.set(league.league.name, league.league.id)
      }
      document.getElementById("players")!.className="visible";
    });
  }
  consola(msg:string){
    console.log(msg);
  }
  getPlayers(league:number){
    this.footballService.setCurrentLeague(String(league));
  }

}
