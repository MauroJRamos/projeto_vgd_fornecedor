import smtplib
import ssl
import os


from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from ConfigParser import getDadosConfigEmail
from FornecedorDAO import getDataProdutoNaoEncontrado,getDataProdutosEstoquePositivo,getDataProdutosSemEstoque
from ConectorDB import getConnection


def criar_arquivo_txt(produtos, tipo_arquivo):
    nome_arquivo = f"produtos_new_cad_{tipo_arquivo}.txt"
    with open(nome_arquivo, "w") as file:
        for produto in produtos:
            # Limpar os caracteres indesejados
            produto_limpo = produto[0].replace("'", "").replace("(", "").replace(")", "").replace("\\n", "")
            # Limpa a quebra de linha persistida em banco.
            produto_limpo = produto_limpo.rstrip("\n")
            file.write(f"{produto_limpo}\n")

def enviarEmailComAnexo(destinatarios, assunto, corpo, emailRemetente, senha, smtp_server, smtp_port):
    # Configurações do Gmail
    gmail_smtp_server = smtp_server
    gmail_smtp_port = smtp_port # Porta para o servidor do Gmail
    seu_email = emailRemetente  # Substitua pelo seu e-mail do Gmail
    sua_senha = senha  # Substitua pela senha do seu e-mail do Gmail

    # Criando o objeto MIMEText para o corpo do e-mail
    msg = MIMEMultipart()
    msg['From'] = seu_email
    msg['To'] = ", ".join(destinatarios)
    msg['Subject'] = assunto

    # Adicionando o corpo do e-mail
    #msg.attach(MIMEText(corpo, 'plain'))
    msg.attach(MIMEText(corpo, 'html'))

    # Verificando e anexando o arquivo produtos_nao_encontrados.txt
    arquivo_anexo = "produtos_new_cad_nao_encontrados.txt"
    if os.path.exists(arquivo_anexo):
        with open(arquivo_anexo, "r") as file:
            attachment = MIMEText(file.read())
            attachment.add_header("Content-Disposition", "attachment", filename=arquivo_anexo)
            msg.attach(attachment)

    # Verificando e anexando o arquivo produtos_sem_estoque.txt
    arquivo_anexo = "produtos_new_cad_sem_estoque.txt"
    if os.path.exists(arquivo_anexo):
        with open(arquivo_anexo, "r") as file:
            attachment = MIMEText(file.read())
            attachment.add_header("Content-Disposition", "attachment", filename=arquivo_anexo)
            msg.attach(attachment)

    # Verificando e anexando o arquivo produtos_sem_estoque.txt
    arquivo_anexo = "produtos_new_cad_estoque_positivo.txt"
    if os.path.exists(arquivo_anexo):
        with open(arquivo_anexo, "r") as file:
            attachment = MIMEText(file.read())
            attachment.add_header("Content-Disposition", "attachment", filename=arquivo_anexo)
            msg.attach(attachment)

    # Criando uma conexão segura com o servidor SMTP do Gmail
    context = ssl.create_default_context()
    with smtplib.SMTP(gmail_smtp_server, gmail_smtp_port) as server:
        server.starttls(context=context)
        server.login(seu_email, sua_senha)
        server.sendmail(seu_email, destinatarios, msg.as_string())
        #server.sendmail(seu_email, email_destinatario, msg.as_string())

    print("E-mail de SUCESSO enviado com sucesso!")



def enviarEmail(destinatarios, assunto, corpo, emailRemetente, senha, smtp_server, smtp_port):
    # Configurações do Gmail
    gmail_smtp_server = smtp_server
    gmail_smtp_port = smtp_port  # Porta para o servidor do Gmail
    seu_email = emailRemetente  # Substitua pelo seu e-mail do Gmail
    sua_senha = senha  # Substitua pela senha do seu e-mail do Gmail

    # Criando o objeto MIMEText para o corpo do e-mail
    msg = MIMEMultipart()
    msg['From'] = seu_email
    msg['To'] = ", ".join(destinatarios)
    msg['Subject'] = assunto

    # Adicionando o corpo do e-mail
    msg.attach(MIMEText(corpo, 'html'))

    # Criando uma conexão segura com o servidor SMTP do Gmail
    context = ssl.create_default_context()
    with smtplib.SMTP(gmail_smtp_server, gmail_smtp_port) as server:
        server.starttls(context=context)
        server.login(seu_email, sua_senha)
        server.sendmail(seu_email, destinatarios, msg.as_string())
        #server.sendmail(seu_email, email_destinatario, msg.as_string())

    print("E-mail enviado com sucesso!")




def geraRelatorioDeExecuçãoDoRobo(cnx):
    print("Gerando os dados para Relatorio...")
    produtosSemEstoque = getDataProdutosSemEstoque(cnx)
    produtosEstoquePositivo = getDataProdutosEstoquePositivo(cnx)
    produtosNaoEncontrado = getDataProdutoNaoEncontrado(cnx)
    criar_arquivo_txt(produtosNaoEncontrado, "nao_encontrados")
    criar_arquivo_txt(produtosSemEstoque, "sem_estoque")
    criar_arquivo_txt(produtosEstoquePositivo,"estoque_positivo")
    qtd_prod_nao_encont = len(produtosNaoEncontrado)
    qtd_prod_estoque_positivo = len(produtosEstoquePositivo)
    qtd_prod_sem_estoque = len(produtosSemEstoque)
    emailRemetente, senha, smtp_server, smtp_port, destinatarios = getDadosConfigEmail()
    #email_destinatario = destinatarios #['mauroramosti@gmail.com','mauronegociosblr@gmail.com']
    assunto = 'Relatorio de execução do Robo cadastro de produtos'
    corpo = f"""
        <html>
            <body>
                <h3>Relatórios de dados sobre a execução do Robo de cadastro de novos produtos</h3>
                <p>Quantidade de produtos não encontrados:      {qtd_prod_nao_encont}</p>
                <p>Quantidade de produtos com estoque positivo: {qtd_prod_estoque_positivo}</p>
                <p>Quantidade de produtos sem estoque:          {qtd_prod_sem_estoque}</p>
            </body>
        </html>
        """
    enviarEmailComAnexo(destinatarios, assunto, corpo,emailRemetente, senha, smtp_server, smtp_port)