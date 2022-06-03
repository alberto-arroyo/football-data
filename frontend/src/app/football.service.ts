import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { BehaviorSubject, catchError, Observable, Subject } from 'rxjs';
import { Player, PlayerSeason, SeasonAPI } from './interfaces';
@Injectable({
  providedIn: 'root'
})
export class FootballService {
  private apiUrl = "https://api-football-beta.p.rapidapi.com";
  private playersUrl = "http://localhost:8080/api/players";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Rapidapi-Host': 'api-football-beta.p.rapidapi.com',
      'X-Rapidapi-Key': '1ca8f45498msh79b41fd9e3cff77p102680jsn7e0f91c5cbdd',//"670dea67a9msh2227738e11431c1p1516ccjsncb9b161c9ae1",
    })
  }
  httpOptionsJSON = {
    headers: new HttpHeaders({ 'Content-Type': 'text' })
  };
  private currentCountry = new BehaviorSubject<string>("Uefa");
  private currentLeague = new Subject<string>();

  constructor(private http: HttpClient) { }

  /** SHARED DATA AND API FOOTBALL*/
  getAllSeasons(idPlayer:number, season:number):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/players?season=${season}&id=${idPlayer}`, this.httpOptions);
  }

  getLeagues(country:string):Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/leagues?search=${country}`, this.httpOptions);
  }

  getTopScorers(idLeague:number, season:number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/players/topscorers?league=${idLeague}&season=${season}`, this.httpOptions)
  }

  getCurrentCountryObservable(): Observable<string>{
    return this.currentCountry.asObservable();
  }

  setCurrentCountry(league:string) {
    this.currentCountry.next(league);
  }

  getCurrentLeagueObservable(): Observable<string>{
    return this.currentLeague.asObservable();
  }

  setCurrentLeague(league:string) {
    this.currentLeague.next(league);
  }


  /** API PLAYERS */
  getPlayers():Observable<Player[]> {
    return this.http.get<Player[]>(this.playersUrl);
  }

  getPlayer(id:number): Observable<Player>{
    return this.http.get<Player>(this.playersUrl+ '/' + id);
  }

  getPlayersByName(name:string):Observable<Player[]> {
    return this.http.get<Player[]>(`${this.playersUrl}/searchByName/${name}`);
  }
  updatePlayer(player:Player): Observable<any> {
    return this.http.put(this.playersUrl, player);
  }
  postPlayer(player:Player): Observable<Player>{
    return this.http.post<Player>(this.playersUrl, player);
  }
  deletePlayer(id: number): Observable<Player> {
    return this.http.delete<Player>(`${this.playersUrl}/${id}`);
  }
  getValue(player: string): Observable<string> {
    return this.http.get<string>(`${this.playersUrl}/value/${player}`);
  }

  getSeasons(playerId: number): Observable<SeasonAPI[]>{
    return this.http.get<SeasonAPI[]>(`${this.playersUrl}/seasons/${playerId}`);
  }

  postSeason(seasonAPI: SeasonAPI):Observable<SeasonAPI> {
    return this.http.post<SeasonAPI>(`${this.playersUrl}/seasons/`, seasonAPI);
  }
}
