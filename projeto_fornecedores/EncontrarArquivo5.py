import os



from ArquivosDAO import insertArquivos
from ConectorDB import getConnection
from ConfigParser import getDadosConfigArquivo
import os

from LogFornecedoresDAO import insertLogFornecedor


#Nesta extração conseguimos separar os diretorios
#if __name__ == '__main__':
def getSourcePathArquivoAndPastaCidade():
    try:
        print("INICIO - ENCONTAR ARQUIVOS E PATH")
        cnx = getConnection()
        status_execucao = "N"
        diretorio_base, prefixo_arquivo, num_pasta_cidade, num_pasta_ano = getDadosConfigArquivo()

        caminhos_encontrados = []

        for pasta_raiz, pastas, arquivos in os.walk(diretorio_base):
            for nome_arquivo in arquivos:
                #if nome_arquivo == "Retorno de Cotação.xlsx":
                if nome_arquivo.startswith(prefixo_arquivo):
                    caminho_completo = os.path.join(pasta_raiz, nome_arquivo)
                    pasta_arquivo = os.path.dirname(caminho_completo)

                    # Dividindo o caminho da pasta_raiz em componentes, separando as pastas
                    componentes_pasta_raiz = os.path.normpath(pasta_raiz).split(os.path.sep)

                    # Convertendo num_pasta para inteiro
                    num_pasta_cidade = int(num_pasta_cidade)
                    num_pasta_ano = int(num_pasta_ano)
                    # Obtendo a próxima pasta após a pasta_raiz
                    cidade_pasta = None
                    if len(componentes_pasta_raiz) > 0:
                        cidade_pasta = componentes_pasta_raiz[num_pasta_cidade]
                        ano_pasta = componentes_pasta_raiz[num_pasta_ano]

                    caminhos_encontrados.append((caminho_completo, pasta_arquivo, cidade_pasta, ano_pasta))

        # Exibindo os caminhos dos arquivos, suas respectivas pastas e a próxima pasta após a pasta_raiz
        print("Arquivos, suas pastas e a próxima pasta após a pasta_raiz:")
        for caminho_arquivo, pasta_arquivo, cidade_pasta, ano_pasta in caminhos_encontrados:
            print(f"Arquivo: {caminho_arquivo}")
            print(f"Pasta Completa: {pasta_arquivo}")
            print(f"Pasta Cidade: {cidade_pasta}")
            print(f"Pasta Ano: {ano_pasta}")
            insertArquivos(cnx, caminho_arquivo, cidade_pasta,ano_pasta, status_execucao)
            print()
    except Exception as e:
        print(f"Erro para encontrar arquivo: {e}")
        error_message = f"Erro para encontrar arquivo: {e}"
        insertLogFornecedor(error_message, "Encontar Arquivo")
        raise