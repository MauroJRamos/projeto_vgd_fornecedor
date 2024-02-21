package com.controle.sistema.fornecedores.dto;

import java.io.Serializable;

import com.controle.sistema.fornecedores.entities.Fornecedor;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FornecedorDTO implements Serializable {	
	private static final long serialVersionUID = 1L;
	

	private Long id;
	
	private String dscFornecedor;
	
	private String dscEmail;
	
	private String dscDataSolicitacao;
	
	private String dscRetorno01;
	
	private String dsctentativa01;
	
	private String dscRetorno02;
	
	private String dscContato01;
	
	private String dscContato02;
	
	private String dscContato03;
	
	private String dscCategoria;
	
	private String dscPathCidade;
	
	public FornecedorDTO(Fornecedor entity) {
        this.id = entity.getId();
        this.dscFornecedor = entity.getDscFornecedor();
        this.dscEmail = entity.getDscEmail();
        this.dscDataSolicitacao = entity.getDscDataSolicitacao();
        this.dscRetorno01 = entity.getDscRetorno01();
        this.dsctentativa01 = entity.getDsctentativa01();
        this.dscRetorno02 = entity.getDscRetorno02();
        this.dscContato01 = entity.getDscContato01();
        this.dscContato02 = entity.getDscContato02();
        this.dscContato03 = entity.getDscContato03();
        this.dscCategoria = entity.getDscCategoria();
        this.dscPathCidade = entity.getDscPathCidade();
    }
	
}

