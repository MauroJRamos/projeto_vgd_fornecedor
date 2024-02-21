package com.controle.sistema.fornecedores.controllers;

import java.net.URI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.controle.sistema.fornecedores.dto.FornecedorDTO;
import com.controle.sistema.fornecedores.services.FornecedorService;

@RestController
@RequestMapping(value = "/fornecedor")
public class FornecedorController {
	
	
	@Autowired 
	public FornecedorService service;
	
	@GetMapping
	public ResponseEntity<Page<FornecedorDTO>> findAll(
			@RequestParam(value = "categoria", defaultValue = "")String categoria,
			@RequestParam(value = "pathCidade", defaultValue = "")String pathCidade,
			Pageable pageable){
		Page<FornecedorDTO> list = service.findAllPaged(categoria, pathCidade, pageable); 
		return ResponseEntity.ok().body(list);
		
	}
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<FornecedorDTO> findById(@PathVariable Long id){
		FornecedorDTO dto = service.findById(id); 
		return ResponseEntity.ok().body(dto);
		
	}
	
	@PostMapping
	public ResponseEntity<FornecedorDTO> insert(@RequestBody FornecedorDTO dto) {
		dto = service.insert(dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
		        .buildAndExpand(dto.getId()).toUri();
		return ResponseEntity.created(uri).body(dto);
		
	}
	
	@PutMapping(value = "/{id}")
	public ResponseEntity<FornecedorDTO> update(@PathVariable Long id, @RequestBody FornecedorDTO dto) {
		dto = service.update(id, dto);
		return ResponseEntity.ok().body(dto);
			
	}
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		service.delete(id);
		return ResponseEntity.noContent().build();
			
	}


}
