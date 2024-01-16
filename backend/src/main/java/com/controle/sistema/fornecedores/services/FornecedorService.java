package com.controle.sistema.fornecedores.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.controle.sistema.fornecedores.dto.FornecedorDTO;
import com.controle.sistema.fornecedores.entities.Fornecedor;
import com.controle.sistema.fornecedores.repository.FornecedorRepository;

@Service
public class FornecedorService {
	
	@Autowired
	private FornecedorRepository repository;
	
	@Transactional(readOnly = true)
	public Page<FornecedorDTO> findAllPaged(String categoria, String pathCidade, Pageable pageable) {
		Page<Fornecedor> list = repository.findByDscCategoriaContainingAndDscPathCidadeContaining(categoria, pathCidade, pageable);
		return list.map(x -> new FornecedorDTO(x));
	

	}

}
