

import os

from ArquivosDAO import insertArquivos
from ConectorDB import getConnection
from ConfigParser import getDadosConfigArquivo


def encontrar_arquivo_e_pasta(diretorio_base, nome_arquivo):
    for pasta_raiz, pastas, arquivos in os.walk(diretorio_base):
        for arquivo in arquivos:
            if arquivo == nome_arquivo:
                caminho_completo = os.path.join(pasta_raiz, arquivo)
                relativo_a_comprasnet = os.path.relpath(pasta_raiz, diretorio_base)
                return caminho_completo, relativo_a_comprasnet.replace('\\', '/')

    return None, None  # Se o arquivo não for encontrado

if __name__ == '__main__':
    cnx = getConnection()
    diretorio_base , nome_arquivo = getDadosConfigArquivo()
    # Diretório base onde você deseja iniciar a busca
    #diretorio_base = r'C:\Mauro\Projetos\Projeto VGD - CAD Fornecedores\COMPRASNET'

    # Nome do arquivo que você deseja encontrar
    #nome_arquivo = 'Retorno de Cotação-.xlsx'

    caminho_arquivo, pasta_rel_comprasnet = encontrar_arquivo_e_pasta(diretorio_base, nome_arquivo)

    if caminho_arquivo:
        status_execucao = "N"
        print(f"Caminho do arquivo: {caminho_arquivo}")
        print(f"Pasta após COMPRASNET: {pasta_rel_comprasnet}")
        insertArquivos(cnx, caminho_arquivo,pasta_rel_comprasnet, status_execucao)
    else:
        print("Arquivo não encontrado.")