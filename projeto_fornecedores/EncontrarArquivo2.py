import os

if __name__ == '__main__':
    nome_arquivo = "Retorno de Cotação-.xlsx"
    diretorio_base = r'C:\Mauro\Projetos\Projeto VGD - CAD Fornecedores\COMPRASNET'

    pastas_e_arquivos = {}

    for pasta_raiz, pastas, arquivos in os.walk(diretorio_base):
        if pasta_raiz not in pastas_e_arquivos:
            pastas_e_arquivos[pasta_raiz] = []
            pastas_e_arquivos[pasta_raiz].extend([os.path.join(pasta_raiz, nome_arquivo)
                 for nome_arquivo in arquivos
                                              ])

    # Exibindo os resultados
    print("Pastas e seus arquivos correspondentes:")
    for pasta, arquivos in pastas_e_arquivos.items():
        print(f'Pasta: {pasta}')
        print('Arquivos:')
        for arquivo in arquivos:
            print(arquivo)
        print()
