import { Component, OnInit } from '@angular/core';
import { FootballService } from '../football.service';
import { Player } from '../interfaces';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  players:Player[] = []

  constructor(private footballService:FootballService) { }

  ngOnInit(): void {
    this.footballService.getPlayers().subscribe(players => {
      for (let player of players) {
        this.addPlayer(player);
      }
    });
  }

  setPlayers(players: Player[]) {
    this.players = players;
  }

  addPlayer(p:Player) {
    this.players.push(p);
  }

}
