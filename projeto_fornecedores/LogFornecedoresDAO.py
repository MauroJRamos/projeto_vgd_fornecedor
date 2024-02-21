import mysql.connector
import logging
from datetime import datetime

from ConectorDB import getConnection

# Set the logging level to INFO
logging.basicConfig(level=logging.INFO)

# Create a logger object
logger = logging.getLogger(__name__)

def insertLogFornecedor(dsc_log, tipo_log):
    try:
        cnx = getConnection()
        cursor = cnx.cursor()
        sql = "INSERT INTO tb_log_fornecedores (dsc_log, tipo_log, data_execucao) VALUES (%s, %s, %s)"
        val = (dsc_log, tipo_log, datetime.now())

        cursor.execute(sql, val)
        cnx.commit()
    except mysql.connector.Error as err:
        if err.errno == mysql.connector.errorcode.ER_DUP_ENTRY:
           logger.info("[insertLogFornecedor]: PK [{}] Violated, skipping insert...".format())
        else:
           logger.error("[insertLogFornecedor]: {}".format(err))

    finally:
        cursor.close()


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


