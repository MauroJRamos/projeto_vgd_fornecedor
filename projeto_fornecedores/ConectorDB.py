import mysql.connector


# Establish a connection to the database
def getConnection():

    try:
        cnx = mysql.connector.connect(user='root', password='123456',
                                      host='localhost', database='db_fornecedores')
    except mysql.connector.Error as error:
        print(f"Error connecting to MySQL: {error}")
        return None
    
    return cnx