import mysql.connector
import logging
from datetime import datetime


# Set the logging level to INFO
logging.basicConfig(level=logging.INFO)

# Create a logger object
logger = logging.getLogger(__name__)

def insertArquivos(cnx,caminho_arquivo, pasta_rel_comprasnet, status_execucao):
    try:
        cursor = cnx.cursor()
        sql = "INSERT INTO tb_arquivos (path_arq_contacao, path_pasta_cidade, status_execucao, data_execucao) VALUES (%s, %s, %s, %s)"
        val = (caminho_arquivo, pasta_rel_comprasnet,status_execucao, datetime.now())

        cursor.execute(sql, val)
        cnx.commit()
    except mysql.connector.Error as err:
        if err.errno == mysql.connector.errorcode.ER_DUP_ENTRY:
           logger.info("[insertArquivos]: PK [{}] Violated, skipping insert...".format())
        else:
           logger.error("[insertArquivos]: {}".format(err))

    finally:
        cursor.close()


def getCodigoArquivosNãoProcessados(cnx):
    try:
        cursor = cnx.cursor()
        # Define the table name
        table_name = "tb_arquivos"

        # Define the condition for the WHERE clause
        condition = "status_execucao = 'N'"

        # Generate the SELECT statement with the WHERE clause
        sql_select = f"SELECT * FROM {table_name} WHERE {condition};"

        cursor.execute(sql_select)

        codigosId = cursor.fetchall()
       # codigos = [codigo[0] for codigo in codigosId]
       # arquivos = [arquivo[1] for arquivo in codigosId]
       # paths = [path[2] for path in codigosId]
        logger.info("[getCodigoArquivosNãoProcessados]->products: {}".format(codigosId))

    except mysql.connector.Error as error:
        logger.error("[getCodigoArquivosNãoProcessados]: {}".format(error))

    finally:
        cursor.close()

    return codigosId


def updateStatusExecucao(cnx, id_arq):
    status_execucao = "S"

    try:
        cursor = cnx.cursor()
        sql = "UPDATE tb_arquivos SET status_execucao = %s, data_execucao = %s WHERE id = %s"
        val = (status_execucao, datetime.now(), id_arq)

        cursor.execute(sql, val)
        if cursor.rowcount == 0:
            logger.info("[updateStatusExecucao]: Arquivo com código [{}] não encontrado.".format(id_arq))
        else:
            cnx.commit()
    except mysql.connector.Error as err:
        if err.errno == mysql.connector.errorcode.ER_DUP_ENTRY:
            logger.info("[updateStatusExecucao]: PK [{}] Violated, skipping update...".format(id_arq))
        else:
            logger.error("[updateStatusExecucao]: {}".format(err))

    finally:
        cursor.close()


def getNomeMarca(marcaId,cnx):
    try:
        cursor = cnx.cursor()
        # Define the table name
        table_name = "tb_marca"

        # Define the condition for the WHERE clause
        condition = f"id = {marcaId}"

        # Generate the SELECT statement with the WHERE clause
        sql_select = f"SELECT nom_marca FROM {table_name} WHERE {condition};"

        cursor.execute(sql_select)

        marca = cursor.fetchone()
        logger.info("[getNomeMarca]->marca: {}".format(marca))

    except mysql.connector.Error as error:
        logger.error("[getNomeMarca]: {}".format(error))

    finally:
        cursor.close()

    return marca