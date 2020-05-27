from pymongo import MongoClient
import json

def inicializarDB():
    try:
        client = MongoClient(host='base_mongo', port= 27017)
        bbdd = client["super_heroes"]
        return bbdd
    except (Exception) as err:
        return err

def cargarBase (bbdd):
    with open('personajes.json') as f:
        file_data = json.load(f)
        bbdd.listado.drop()
        bbdd.listado.insert_many(file_data)

def inicializar_DbMovies():
    try:
        client = MongoClient(host='base_mongo',port=27017)
        bbdd = client["peliculas"]
        return bbdd
    except (Exception) as err:
        return err