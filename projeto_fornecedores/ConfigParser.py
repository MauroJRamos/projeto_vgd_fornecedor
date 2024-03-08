import configparser


def formatNumber(vlrToFormat):
    # Replace dots with nothing
    vlrToFormat = vlrToFormat.replace(".", "")

    # Replace commas with a special character
    vlrToFormat = vlrToFormat.replace(",", ".")

    return vlrToFormat

def GetLerPathArquivo():
    config = configparser.ConfigParser()
    config.read('config.ini')

    lerArquivo = config['dadosArquivo']['ler_arquivo']
    print("ler Arquivo: {}".format(lerArquivo))

    if lerArquivo is None:
        raise ValueError("[lerArquivo] value cannot be None!")

    return lerArquivo


def getDadosConfigArquivo():
    config = configparser.ConfigParser()
    config.read('config.ini')

    diretorio_base = config['dadosArquivo']['diretorio_base']
    nome_arquivo = config['dadosArquivo']['nome_arquivo']
    num_pasta_cidade = config['dadosArquivo']['num_pasta_cidade']
    num_pasta_ano  = config['dadosArquivo']['num_pasta_ano']

    if diretorio_base is None or nome_arquivo is None or num_pasta_cidade is None or num_pasta_ano is None:
        raise ValueError(" Valor não pode ser None!")

    return diretorio_base, nome_arquivo, num_pasta_cidade, num_pasta_ano

