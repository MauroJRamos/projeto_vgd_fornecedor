import os



from ArquivosDAO import insertArquivos
from ConectorDB import getConnection
from ConfigParser import getDadosConfigArquivo
import os
#Nesta extração conseguimos separar os diretorios
if __name__ == '__main__':
    cnx = getConnection()
    status_execucao = "N"
    #nome_arquivo = "Retorno de Cotação.xlsx"
    prefixo_arquivo = "Retorno de Cotação"
    #diretorio_base = r'C:\Mauro\Projetos\Projeto VGD - CAD Fornecedores\COMPRASNET'
    diretorio_base = r'C:\Mauro\Projetos\Projeto VGD - CAD Fornecedores\xEncerradasTF'

    caminhos_encontrados = []

    for pasta_raiz, pastas, arquivos in os.walk(diretorio_base):
        for nome_arquivo in arquivos:
            #if nome_arquivo == "Retorno de Cotação.xlsx":
            if nome_arquivo.startswith(prefixo_arquivo):
                caminho_completo = os.path.join(pasta_raiz, nome_arquivo)
                pasta_arquivo = os.path.dirname(caminho_completo)

                # Dividindo o caminho da pasta_raiz em componentes
                componentes_pasta_raiz = os.path.normpath(pasta_raiz).split(os.path.sep)

                # Obtendo a próxima pasta após a pasta_raiz
                proxima_pasta = None
                if len(componentes_pasta_raiz) > 0:
                    proxima_pasta = componentes_pasta_raiz[5]

                caminhos_encontrados.append((caminho_completo, pasta_arquivo, proxima_pasta))

    # Exibindo os caminhos dos arquivos, suas respectivas pastas e a próxima pasta após a pasta_raiz
    print("Arquivos, suas pastas e a próxima pasta após a pasta_raiz:")
    for caminho_arquivo, pasta_arquivo, proxima_pasta in caminhos_encontrados:
        print(f"Arquivo: {caminho_arquivo}")
        print(f"Pasta Completa: {pasta_arquivo}")
        print(f"Próxima Pasta Selecionada: {proxima_pasta}")
        insertArquivos(cnx, caminho_arquivo, proxima_pasta, status_execucao)
        print()
