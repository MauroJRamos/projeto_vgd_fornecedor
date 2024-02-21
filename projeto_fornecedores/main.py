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
from LogFornecedoresDAO import insertLogFornecedor

if __name__ == '__main__':
    try:

        print("PROGRAMA PRINCIPAL")
        cnx = getConnection()
        codigosIdPathArquivos = getCodigoArquivosNãoProcessados(cnx)
        print(f"Planilhas: {codigosIdPathArquivos}")
        for pathArquivo in codigosIdPathArquivos:
            arquivo = pathArquivo[1]
            pasta = pathArquivo[2]
            #pasta_relativa = os.path.relpath(pasta, diretorio_base)
            planilhas = GetDadosPlanilhas(arquivo)
            if not planilhas:
                print(f"Erro ao processar planilha {pasta}")
                print(f"Caminho Arquivo {arquivo}")
                insertLogFornecedor(arquivo, pasta)
                continue
            #print(f"Processando planilha {pasta_relativa}")
            print(f"Processando planilha {pasta}")
            print(f"Caminho do arquivo:{arquivo}")
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
                            insertFornecedor(cnx, fornecedor, email, data_solicitacao, retorno_01, tentativa_01, retorno_02, contato01, contato02, contato03, categoria, pasta)
                            print(
                                f"{fornecedor}, {email}, {data_solicitacao}, {retorno_01}, {tentativa_01}, {retorno_02}, {contato01}, {contato02}, {contato03}, {categoria}, {pasta}")
                        else:
                            print("LINHA VAZIA")
            id_arq = pathArquivo[0]
            updateStatusExecucao(cnx, id_arq)
    except Exception as e:
        print(f"Erro durante a execução: {e}")
        error_message = f"Erro durante a execução: {e}"
        insertLogFornecedor(error_message, "extração dados - main")
        raise
    finally:
        cnx.close()
# See PyCharm help at https://www.jetbrarowins.com/help/pycharm/
