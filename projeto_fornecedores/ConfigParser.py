import configparser

def getQtdDiasLimpeza() -> object:
    config = configparser.ConfigParser()
    config.read('config.ini')

    qtdDias = config['dadosPostBling']['qtdDiasLimpezaTabela']
    return qtdDias


def loadCredencialAncora():
    config = configparser.ConfigParser()
    config.read('config.ini')
    # Access values in the configuration file
    usuario_ancora = config['dadosAncora']['usuario']
    senha_ancora = config['dadosAncora']['senha']

    return usuario_ancora, senha_ancora


def loadSiteLoginAncora():
    config = configparser.ConfigParser()
    config.read('config.ini')
    # Access values in the configuration file
    siteLogin = config['dadosAncora']['siteLogin']

    if siteLogin is None:
        raise ValueError("[siteLogin] value cannot be None!")

    return siteLogin


def loadTempoEsperaEmSegundosAncora():
    config = configparser.ConfigParser()
    config.read('config.ini')
    # Access values in the configuration file
    segundosEspera = config['dadosAncora']['qtdeSegundos']

    if segundosEspera is None:
        raise ValueError("[segundosEspera] value cannot be None!")

    return int(segundosEspera)


def formatNumber(vlrToFormat):
    # Replace dots with nothing
    vlrToFormat = vlrToFormat.replace(".", "")

    # Replace commas with a special character
    vlrToFormat = vlrToFormat.replace(",", ".")

    return vlrToFormat


def getUrlPostProduct():
    config = configparser.ConfigParser()
    config.read('config.ini')

    urlPostProduct = config['dadosBling']['urlPostProduct']

    if urlPostProduct is None:
        raise ValueError("[urlPost] value cannot be None!")

    return urlPostProduct


def getDadosConfigEmail():
    config = configparser.ConfigParser()
    config.read('config.ini')

    emailRemetente = config['dadosEmail']['emailRemetente']
    senha = config['dadosEmail']['senha']
    smtp_server = config['dadosEmail']['smtp_server']
    smtp_port = config['dadosEmail']['smtp_port']
    #destinatarios = config['dadosEmail']['destinatarios']

    # Remova as aspas duplas da string e divida os destinatários em uma lista
    destinatarios = [email.strip().strip("'") for email in config['dadosEmail']['destinatarios'].split(',')]
    if emailRemetente is None or senha is None or smtp_server is None or smtp_port is None or destinatarios is None:
        raise ValueError("Algum valor não pode ser None!")

    return emailRemetente, senha, smtp_server, smtp_port, destinatarios

def getBlingApiKey():
    config = configparser.ConfigParser()
    config.read('config.ini')

    apikey = config['dadosBling']['apikey']

    if apikey is None:
        raise ValueError("[apikey] value cannot be None!")

    return apikey

def AtivarEstoqueMinimo():
    config = configparser.ConfigParser()
    config.read('config.ini')

    ativarEstoqueMinimo = config['dadosProduto']['ativarEstoqueMinimo']
    print("Ativar Estoque Minimo: {}".format(ativarEstoqueMinimo))

    if ativarEstoqueMinimo is None:
        raise ValueError("[ativarEstoqueMinimo] value cannot be None!")

    return eval(ativarEstoqueMinimo)


def GetQtdEstoqueMinimo():
    config = configparser.ConfigParser()
    config.read('config.ini')

    estoqueMinimo = config['dadosProduto']['estoqueMinimo']
    print("Estoque Minimo: {}".format(estoqueMinimo))

    if estoqueMinimo is None:
        raise ValueError("[estoqueMinimo] value cannot be None!")

    return eval(estoqueMinimo)


def GetIdCategoria():
    config = configparser.ConfigParser()
    config.read('config.ini')

    idCategoria = config['dadosProduto']['idCategoria']
    print("Id Categoria: {}".format(idCategoria))

    if idCategoria is None:
        raise ValueError("[idCategoria] value cannot be None!")

    return eval(idCategoria)


def loadProductFromFile():
    config = configparser.ConfigParser()
    config.read('config.ini')

    carregarDoArquivo = config['dadosProduto']['carregarDoArquivo']
    print("carregarDoArquivo: {}".format(carregarDoArquivo))

    if carregarDoArquivo is None:
        raise ValueError("[carregarDoArquivo] value cannot be None!")

    return eval(carregarDoArquivo)

def getDadosConfigArquivo():
    config = configparser.ConfigParser()
    config.read('config.ini')

    diretorio_base = config['dadosArquivo']['diretorio_base']
    nome_arquivo = config['dadosArquivo']['nome_arquivo']

    if diretorio_base is None or nome_arquivo is None:
        raise ValueError(" Valor não pode ser None!")

    return diretorio_base, nome_arquivo

if __name__ == '__main__':

    print("Vlr Formated: [{}]".format(formatNumber('9.999.990,00')))
    print("getUrlPostProduct:[{}]".format(getUrlPostProduct()))
    print("getBlingApiKey:[{}]".format(getBlingApiKey()))
    print("loadProductFromFile:[{}]".format((loadProductFromFile() == True)))
