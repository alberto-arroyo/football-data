export interface Player {
  id:number;
  name:string;
  age:number;
  photo:string;
  nationality:string;
  value:string;
  seasons?: number[];
}

export interface PlayerSeason {
  player:Player
  statistics:{
    goals:{
      total:number;
      assists:number;
    };
    team:{
      id:number;
      name:string;
      logo:string;
    }
    league:{
      name:string;
      id:number;
    }
  }[]
}
export interface SeasonAPI {
  id: number;
  playerId: number;
  year: string;
  team: string;
  goals: number;
  assists: number;
  games:number;
}
