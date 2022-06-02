package ual.backend.repository;

import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import ual.backend.entity.PlayerSeason;

import org.springframework.data.repository.CrudRepository;

@RepositoryRestResource
public interface PlayerSeasonRepository extends CrudRepository<PlayerSeason, Long>{
    
}
