package ual.backend.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ual.backend.entity.Player;
import ual.backend.entity.PlayerSeason;
import ual.backend.repository.PlayerRepository;
import ual.backend.repository.PlayerSeasonRepository;

@Service
public class PlayerService {

    @Autowired
    private PlayerRepository playerRepository;

    @Autowired
    PlayerSeasonRepository playerSeasonRepository;

    public Player save(Player player){
        return playerRepository.save(player);
    }

    public Player update(Player player){
        return playerRepository.save(player);
    }

    public Player findById(long id) {
        return playerRepository.findById(id).orElse(null);
    }

    public List<Player> findByName(String name) {
        return playerRepository.findByName(name);
    }

    public List<Player> findAll() {
        return (List<Player>)playerRepository.findAll();
    }
    
    public void deleteById(long id) {
        playerRepository.deleteById(id);
        for (PlayerSeason ps: this.playerSeasonRepository.findAll()){
            if (ps.getPlayerId()==id) this.playerSeasonRepository.deleteById(ps.getId());
        }
    }

    public void deleteAll() {
        for (Player player: findAll()) deleteById(player.getId());
    }

    public List<Player> findByNameIgnoreCase(String infix) {
        List<Player> lista = new ArrayList<Player>();
        infix = infix.toLowerCase();
        for (Player player: playerRepository.findAll()) {
            if (player.getName().toLowerCase().contains(infix)) lista.add(player);
        }
        return lista;
    }

    public String getValue(String nameToSearch) {
        try {
            Document webPage = Jsoup.connect("https://www.transfermarkt.es/schnellsuche/ergebnis/schnellsuche?query="+nameToSearch).get(); 
            Element tbody = webPage.getElementById("yw0").getElementsByClass("rechts hauptlink").first();
            return tbody.text().toString();
        } catch (IOException e) {
            return "-";
        }
    }

    public PlayerSeason postSeason(PlayerSeason season) {
        for (PlayerSeason ps : this.playerSeasonRepository.findAll()){
            if (ps.getYear().equals(season.getYear()) && ps.getPlayerId()==season.getPlayerId())
                this.playerSeasonRepository.deleteById(ps.getId());
        }
        return this.playerSeasonRepository.save(season);
    }

    public List<PlayerSeason> getSeasons() {
        return (List<PlayerSeason>)this.playerSeasonRepository.findAll();
    }

    public List<PlayerSeason> getSeasons(long id) {
        ArrayList<PlayerSeason> seasons = new ArrayList<>();
        for (PlayerSeason season: this.getSeasons()){
            if (season.getPlayerId()==id) seasons.add(season);
        }
        return seasons;
    }

    public void deleteAllSeasons() {
        this.playerSeasonRepository.deleteAll();
    }
}
