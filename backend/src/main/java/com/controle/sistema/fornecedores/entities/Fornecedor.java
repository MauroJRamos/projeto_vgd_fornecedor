package com.controle.sistema.fornecedores.entities;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name="tb_fornecedor")
public class Fornecedor implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "dsc_fornecedor")
	private String dscFornecedor;
	
	@Column(name = "dsc_Email")
	private String dscEmail;
	
	@Column(name = "dsc_data_solicitacao")
	private String dscDataSolicitacao;
	
	@Column(name = "dsc_retorno_01")
	private String dscRetorno01;
	
	@Column(name = "dsc_tentativa_01")
	private String dsctentativa01;
	
	@Column(name = "dsc_retorno_02")
	private String dscRetorno02;
	
	@Column(name = "dsc_contato_01")
	private String dscContato01;
	
	@Column(name = "dsc_contato_02")
	private String dscContato02;
	
	@Column(name = "dsc_contato_03")
	private String dscContato03;
	
	@Column(name = "dsc_categoria")
	private String dscCategoria;
	
	@Column(name = "dsc_path_cidade")
	private String dscPathCidade;
	
}
