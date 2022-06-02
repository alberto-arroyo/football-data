package ual.backend.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import ual.backend.entity.Player;

@RepositoryRestResource
public interface PlayerRepository extends CrudRepository<Player, Long> {
    List<Player> findByName(String name);
}
