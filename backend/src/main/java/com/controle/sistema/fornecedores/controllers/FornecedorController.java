package com.controle.sistema.fornecedores.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.controle.sistema.fornecedores.dto.FornecedorDTO;
import com.controle.sistema.fornecedores.services.FornecedorService;

@RestController
@RequestMapping(value = "/fornecedor")
public class FornecedorController {
	
	
	@Autowired 
	public FornecedorService service;
	
	@GetMapping
	public ResponseEntity<Page<FornecedorDTO>> findAll(Pageable pageable){
		Page<FornecedorDTO> list = service.findAllPaged(pageable); 
		return ResponseEntity.ok().body(list);
		
	}

}
