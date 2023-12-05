def validaDadosFornecedor( email, data_solicitacao, retorno_01,
                           tentativa_01, retorno_02, contato01,
                           contato02, contato03, categoria):

    if (email is None):
        email = "não informado"
    if (data_solicitacao is None):
        data_solicitacao = "não informado"
    if (retorno_01 is None):
        retorno_01 = "não informado"
    if (retorno_02 is None):
        retorno_02 = "não informado"
    if (contato01 is None):
        contato01 = "não informado"
    if (contato02 is None):
        contato02 = "não informado"
    if (contato03 is None):
        contato03 = "não informado"
    if (categoria is None or categoria == ''):
        categoria = "não informado"


    return email, data_solicitacao, retorno_01,\
        tentativa_01, retorno_02, contato01, \
        contato02, contato03, categoria