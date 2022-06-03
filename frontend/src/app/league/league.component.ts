import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FootballService } from '../football.service';
import { Player, PlayerSeason, SeasonAPI } from '../interfaces';

@Component({
  selector: 'app-league',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.css']
})
export class LeagueComponent implements OnInit {

  topScorers:PlayerSeason[] = []
  currentIdLeague="1";

  constructor(private route: ActivatedRoute, private footballService: FootballService) { }

  ngOnInit(): void {
    this.footballService.getCurrentLeagueObservable().subscribe(idLeague => {
      this.getScorers(idLeague, "2020"); this.currentIdLeague=idLeague;
    });
  }
  modId(id:string, year:string) {
    document.getElementById('year')!.setAttribute('value', '2020');
    this.getScorers(id, year);
  }
  generarDatosJugadores(){
    let player:Player = {
      id:1,
      name:"Marc Andrè Ter Stegen",
      age:27,
      photo:"https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Ter_Stegen_2019_03_17_2.jpg/368px-Ter_Stegen_2019_03_17_2.jpg",
      nationality:"Germany",
      value:""
    }
    let stats = {
      goals: {total: 30, assists: 17},
      team: {id: 34, name: "FC Barcelona", logo:""},
      league: {id:2, name: "Uefa Champions League"}
    }
    this.topScorers.push({player: player, statistics: [stats]});
    this.topScorers.push({player: player, statistics: [stats]});
    this.topScorers.push({player: player, statistics: [stats]});
  }

  getScorers(idLeague:string, season:string){
    this.topScorers = [];
    this.footballService.getTopScorers(Number(idLeague), Number(season)).subscribe(json => {
      for(var player of json.response){
        let p:Player = {
              id:player.player.id,
              name:player.player.name,
              age:player.player.age,
              photo:player.player.photo,
              nationality:player.player.nationality,
              value:""
            }
            let statistics = {
              goals: {total: player.statistics[0].goals.total, assists: player.statistics[0].goals.assists},
              team: {id: player.statistics[0].team.id, name: player.statistics[0].team.name, logo:player.statistics[0].team.logo},
              league: {id:player.statistics[0].league.id, name: player.statistics[0].league.name}
            }
            this.topScorers.push({player: p, statistics: [statistics]});
            this.getValue(p);
      }
    });
  }

  getValue(p: Player) {
    var nombreStr = "";
    for (let word of p.name.split(" ")) {
      if (word.indexOf(".")!=-1) continue;
      nombreStr += word+" ";
    }
    console.log(nombreStr);
    this.footballService.getValue(nombreStr).subscribe(value => {p.value = value[0]});
  }

  addToFavs(player: Player){
    player.seasons = [];
    for(let i=2010; i<2022; i++){
      this.footballService.getAllSeasons(player.id, i).subscribe(res => {
        console.log(res);
        if(res.results==0)return;
        let season: SeasonAPI = {
          id: 0,
          playerId: player.id,
          year: i.toString(),
          team: "",
          goals: 0,
          assists: 0,
          games:0
        };
        for (let stat of res.response[0].statistics){
          if(season.team==""&&stat.league.country!="World")season.team=stat.team.logo;
          season.goals+=(stat.goals.total |0);
          season.assists+=(stat.goals.assists |0);
          season.games+= (stat.games.appearences |0);
        }
        this.footballService.postSeason(season).subscribe(playerS=>{
          player.seasons!.push(playerS.id);
        });
      });
      this.footballService.postPlayer(player).subscribe(() => {});
    }
    window.alert(`${player.name} has benn added to you favourites players`);
  }

}
