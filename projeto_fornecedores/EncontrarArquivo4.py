import os

from ArquivosDAO import insertArquivos
from ConectorDB import getConnection
from ConfigParser import getDadosConfigArquivo

if __name__ == '__main__':
    cnx = getConnection()
    status_execucao = "N"
    diretorio_base, nome_arquivo = getDadosConfigArquivo()
    #nome_arquivo = "Retorno de Cotação-.xlsx"
    #diretorio_base = r'C:\Mauro\Projetos\Projeto VGD - CAD Fornecedores\COMPRASNET'

    caminhos_encontrados = []

    for pasta_raiz, pastas, arquivos in os.walk(diretorio_base):
        for nome_arquivo in arquivos:
            if nome_arquivo == "Retorno de Cotação.xlsx":
                caminho_completo = os.path.join(pasta_raiz, nome_arquivo)
                pasta_arquivo = os.path.dirname(caminho_completo)
                caminhos_encontrados.append((caminho_completo, pasta_arquivo))

    # Exibindo os caminhos dos arquivos e suas respectivas pastas
    print("Arquivos e suas pastas correspondentes:")
    for caminho_arquivo, pasta_arquivo in caminhos_encontrados:
        print(f"Arquivo: {caminho_arquivo}")
        print(f"Pasta: {pasta_arquivo}")
        insertArquivos(cnx, caminho_arquivo, pasta_arquivo, status_execucao)
        print()
