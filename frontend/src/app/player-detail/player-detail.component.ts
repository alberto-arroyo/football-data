import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FootballService } from '../football.service';
import { Player, PlayerSeason, SeasonAPI } from '../interfaces';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.css']
})
export class PlayerDetailComponent implements OnInit {

  player:Player = {id: 0, name:"", age:0, nationality:"", photo: "", value: ""};
  games = 0;
  goals = 0;
  assists = 0;
  seasons:SeasonAPI[]=[];

  constructor(private route:ActivatedRoute, private footballService:FootballService) { }

  ngOnInit(): void {
    this.footballService.getPlayer(Number(this.route.snapshot.paramMap.get('id'))).subscribe(player=>{
      this.player = player;
      this.footballService.getSeasons(player.id).subscribe(seasons => {
        for(let season of seasons){
          this.seasons.push(season);
          this.games+=Number(season.games);
          this.goals+=Number(season.goals);
          this.assists+=Number(season.assists);
        }
        this.seasons.sort( (a,b) => this.compare(b.year, a.year) );
      });
    });
  }

  private compare (a:any, b:any){
    if (a<b) return -1;
    if (a>b)return 1;
    return 0;
  }
}
