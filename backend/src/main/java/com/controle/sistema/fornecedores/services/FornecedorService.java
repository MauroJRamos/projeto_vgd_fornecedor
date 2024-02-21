package com.controle.sistema.fornecedores.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.controle.sistema.fornecedores.dto.FornecedorDTO;
import com.controle.sistema.fornecedores.entities.Fornecedor;
import com.controle.sistema.fornecedores.repository.FornecedorRepository;
import com.controle.sistema.fornecedores.services.exceptions.DatabaseException;
import com.controle.sistema.fornecedores.services.exceptions.ResourceNotFoundException;

import jakarta.persistence.EntityNotFoundException;



@Service
public class FornecedorService {
	
	@Autowired
	private FornecedorRepository repository;
	
	@Transactional(readOnly = true)
	public Page<FornecedorDTO> findAllPaged(String categoria, String pathCidade, Pageable pageable) {
		Page<Fornecedor> list = repository.findByDscCategoriaContainingAndDscPathCidadeContaining(categoria, pathCidade, pageable);
		return list.map(x -> new FornecedorDTO(x));	

	}
	
	@Transactional(readOnly = true)
	public FornecedorDTO findById(Long id) {
		Optional<Fornecedor> obj = repository.findById(id);
		Fornecedor entity = obj.orElseThrow(() -> new ResourceNotFoundException(" Entidade não existe"));
		return new FornecedorDTO(entity);

	}
	
	
	@Transactional
	public FornecedorDTO insert(FornecedorDTO dto) {
		Fornecedor entity = new Fornecedor();
		copyDtoToEntity(dto, entity);
		entity = repository.save(entity);
		return new FornecedorDTO(entity);
	}

	
	@Transactional
	public FornecedorDTO update(Long id, FornecedorDTO dto) {
	    try {
	        Optional<Fornecedor> optionalEntity = repository.findById(id);

	        if (optionalEntity.isPresent()) {
	            Fornecedor entity = optionalEntity.get();
	            copyDtoToEntity(dto, entity);
	            entity = repository.save(entity);
	            return new FornecedorDTO(entity);
	        } else {
	            throw new ResourceNotFoundException("Id not found " + id);
	        }
	    } catch (EntityNotFoundException e) {
	        throw new ResourceNotFoundException("Id not found " + id);
	    }
	}

	public void delete(Long id) {
		try {
			repository.deleteById(id);
		} catch (EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException("Id not found " + id);
		} catch (DataIntegrityViolationException e) {
			throw new DatabaseException("Integrity Violation");
		}
	}

	private void copyDtoToEntity(FornecedorDTO dto, Fornecedor entity) {

		entity.setDscFornecedor(dto.getDscFornecedor());
		entity.setDscEmail(dto.getDscEmail());
		entity.setDscDataSolicitacao(dto.getDscDataSolicitacao());
		entity.setDscRetorno01(dto.getDscRetorno01());
		entity.setDsctentativa01(dto.getDsctentativa01());
		entity.setDscRetorno02(dto.getDscRetorno02());
		entity.setDscContato01(dto.getDscContato01());
		entity.setDscContato02(dto.getDscContato02());
		entity.setDscContato03(dto.getDscContato03());
		entity.setDscCategoria(dto.getDscCategoria());
		entity.setDscPathCidade(dto.getDscPathCidade());
		
	}

}
