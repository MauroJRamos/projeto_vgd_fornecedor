import os

if __name__ == '__main__':
    nome_arquivo = "Retorno de Cotação-.xlsx"
    diretorio_base = r'C:\Mauro\Projetos\Projeto VGD - CAD Fornecedores\COMPRASNET'

    arquivos_encontrados = []

    for pasta_raiz, pastas, arquivos in os.walk(diretorio_base):
        for nome_arquivo in arquivos:
            if nome_arquivo == "Retorno de Cotação.xlsx":
                caminho_completo = os.path.join(pasta_raiz, nome_arquivo)
                arquivos_encontrados.append(caminho_completo)
                pasta = caminho_completo.replace('\\', '/')

    # Exibindo os caminhos dos arquivos encontrados
    print("Arquivos encontrados:")
    for arquivo in arquivos_encontrados:
        print(arquivo)
        pasta = arquivo.replace('\\', '/')
        print(pasta)
