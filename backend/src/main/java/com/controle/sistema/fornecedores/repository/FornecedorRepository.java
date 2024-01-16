package com.controle.sistema.fornecedores.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;


import com.controle.sistema.fornecedores.entities.Fornecedor;

public interface FornecedorRepository extends JpaRepository<Fornecedor, Long>{
	
	    Page<Fornecedor> findByDscCategoriaContaining(String categoria, Pageable pegeable);
	    
	    Page<Fornecedor> findByDscCategoriaContainingAndDscPathCidadeContaining(String dscCategoria, String dscPathCidade,Pageable pegeable );

}
