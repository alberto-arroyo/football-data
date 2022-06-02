package ual.backend.controller;

import ual.backend.entity.Player;
import ual.backend.entity.PlayerSeason;
import ual.backend.service.PlayerService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



@RestController
@CrossOrigin("*")
@RequestMapping("/players")
public class PlayerController {
    @Autowired
    private PlayerService playerService;

    @PostMapping
    public Player create (@RequestBody Player player){
        return playerService.save(player);
    }

    @PutMapping
    public Player update (@RequestBody Player player) {
        return playerService.save(player);
    }

    @GetMapping
    public List<Player> findAll() {
        return playerService.findAll();
    }

    @GetMapping("/{id}")
    public Player findById(@PathVariable("id") long id) {
        return playerService.findById(id);
    }

    @GetMapping("/names/{name}")
    public List<Player> findByName(@PathVariable String name) {
        return playerService.findByName(name);
    }    

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable("id") long id) {
        playerService.deleteById(id);
    }

    @DeleteMapping("/borrarTodos")
    public void deleteAll() {
        this.playerService.deleteAll();
    }

    @GetMapping("/searchByName/{name}")
    public List<Player> findByNameIgnoreCase(@PathVariable("name") String name) {
        return playerService.findByNameIgnoreCase(name);
    }

    @GetMapping("/value/{name}")
    public String[] getValue(@PathVariable("name") String name) {
        String[] value = {playerService.getValue(name)};
        return value;
    }

     @GetMapping("/seasons/{id}")
    public List<PlayerSeason> getSeasons(@PathVariable("id") long id) {
        return this.playerService.getSeasons(id);
    }
    
    @PostMapping("/seasons/")
    public PlayerSeason postSeason(@RequestBody PlayerSeason season) {
        return this.playerService.postSeason(season);
    }

    @GetMapping(value="/seasons")
    public List<PlayerSeason> getMethodName() {
        return this.playerService.getSeasons();
    }
    
    @DeleteMapping("/clearAll")
    public void clearAll() {
        this.deleteAll();
        this.playerService.deleteAllSeasons();
    }

}
