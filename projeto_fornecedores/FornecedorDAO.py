import mysql.connector
import logging
from datetime import datetime
from ConfigParser import formatNumber

# Set the logging level to INFO
logging.basicConfig(level=logging.INFO)

# Create a logger object
logger = logging.getLogger(__name__)

def insertFornecedor(cnx,fornecedor, email, data_solicitacao, retorno_01, tentativa_01, retorno_02, contato01, contato02, contato03, categoria, pasta, ano):
    try:
        cursor = cnx.cursor()
        sql = "INSERT INTO tb_fornecedor (dsc_fornecedor, dsc_email, dsc_data_solicitacao, dsc_retorno_01, dsc_tentativa_01, dsc_retorno_02, dsc_contato_01, dsc_contato_02, dsc_contato_03, dsc_categoria, dsc_path_cidade, path_pasta_ano) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
        val = (fornecedor, email, data_solicitacao, retorno_01, tentativa_01, retorno_02, contato01, contato02, contato03, categoria, pasta, ano)

        cursor.execute(sql, val)
        cnx.commit()
    except mysql.connector.Error as err:
        if err.errno == mysql.connector.errorcode.ER_DUP_ENTRY:
           logger.info("[insertFornrcrdor]: PK [{}] Violated, skipping insert...".format())
        else:
            logger.error("[insertFornecedor]: {}".format(err))

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