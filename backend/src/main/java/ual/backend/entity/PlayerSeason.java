package ual.backend.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

@Entity
@Table(name="season")
public class PlayerSeason {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @NotBlank
    private String year;
    @NotBlank
    private String team;
    private String goals;
    private String assists;
    private String games;
    private long playerId;

    public PlayerSeason() {

    }

    public String getGames() {
        return games;
    }

    public void setGames(String games) {
        this.games = games;
    }

    public long getPlayerId() {
        return playerId;
    }

    public void setPlayerId(long playerId) {
        this.playerId = playerId;
    }

    public long getPlayer() {
        return playerId;
    }

    public void setPlayer(long playerId) {
        this.playerId = playerId;
    } 

    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }
    public String getYear() {
        return year;
    }
    public void setYear(String year) {
        this.year = year;
    }
    public String getTeam() {
        return team;
    }
    public void setTeam(String team) {
        this.team = team;
    }
    public String getGoals() {
        return goals;
    }
    public void setGoals(String goals) {
        this.goals = goals;
    }
    public String getAssists() {
        return assists;
    }
    public void setAssists(String assists) {
        this.assists = assists;
    }
}
