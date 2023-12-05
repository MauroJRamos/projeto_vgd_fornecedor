# This is a sample Python script.
import os

import openpyxl
import pandas as pd
from openpyxl.reader import workbook

from ArquivosDAO import getCodigoArquivosNãoProcessados, updateStatusExecucao
from ConectorDB import getConnection
from FornecedorDAO import insertFornecedor
from FornecedorValidator import validaDadosFornecedor
from ListaManager import GetDadosPlanilhas

if __name__ == '__main__':
    # Diretório base
    diretorio_base = 'C:\\Mauro\\Projetos\\Projeto VGD - CAD Fornecedores\\COMPRASNET'

    print("PROGRAMA PRINCIPAL")
    cnx = getConnection()
    codigosIdPathArquivos = getCodigoArquivosNãoProcessados(cnx)
    print(f"Planilhas: {codigosIdPathArquivos}")
    for pathArquivo in codigosIdPathArquivos:
        arquivo = pathArquivo[1]
        pasta = pathArquivo[2]
        pasta_relativa = os.path.relpath(pasta, diretorio_base)
        planilhas = GetDadosPlanilhas(arquivo)
        print(f"Processando planilha {pasta_relativa}")
        for planilha in planilhas:
            for row_data in planilha:
                if len(row_data) >= 11 and any(row_data):
                    fornecedor = row_data[0]
                    email = row_data[1]
                    data_solicitacao = row_data[2]
                    retorno_01 = row_data[3]
                    tentativa_01 = row_data[4]
                    retorno_02 = row_data[5]
                    contato01 = row_data[6]
                    contato02 = row_data[7]
                    contato03 = row_data[8]
                    categoria = row_data[10]

                    if fornecedor is not None:
                        email, data_solicitacao, retorno_01, tentativa_01, retorno_02, contato01, contato02, contato03, categoria = validaDadosFornecedor(
                            email, data_solicitacao, retorno_01, tentativa_01, retorno_02, contato01, contato02, contato03, categoria)
                        insertFornecedor(cnx, fornecedor, email, data_solicitacao, retorno_01, tentativa_01, retorno_02, contato01, contato02, contato03, categoria, pasta_relativa)
                        print(
                            f"{fornecedor}, {email}, {data_solicitacao}, {retorno_01}, {tentativa_01}, {retorno_02}, {contato01}, {contato02}, {contato03}, {categoria}, {pasta_relativa}")
                    else:
                        print("LINHA VAZIA")
        id_arq = pathArquivo[0]
        updateStatusExecucao(cnx, id_arq)
# See PyCharm help at https://www.jetbrarowins.com/help/pycharm/
