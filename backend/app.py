from flask import Flask
import json
from flask import jsonify, request, redirect, url_for,send_file
from flask_cors import CORS
from conexion_bbdd import inicializarDB, cargarBase, inicializar_DbMovies
from bson.objectid import ObjectId
from pymongo import TEXT

app = Flask(__name__)
CORS(app)



@app.route('/cargarBase', methods=['GET'])
@app.before_first_request
def cargarDB():
    try:
        db = inicializarDB()
        cargarBase(db)
        db2 = inicializar_DbMovies()
        db2.listado.drop()
        db.listado.create_index([('name', TEXT), ('character', TEXT)])
        return 'ok'
    except (Exception) as err:
        return str(err), 500



@app.route('/listarTodos', methods = ['GET'])
def listarTodo():
    try:
        db = inicializarDB()
        res = []
        for i in db.listado.find({}):
            i["_id"] = str(i["_id"])
            res.append(i)
        return jsonify (res)
    except (Exception) as err:
        return str(err), 500

@app.route('/dc', methods = ['GET'])
def listarDC():
    try:
        db = inicializarDB()
        res = []
        for i in db.listado.find({"house":"DC"}):
            i["_id"] = str(i["_id"])
            res.append(i)
        return jsonify (res)
    
    except (Exception) as err:
        return str(err),500


@app.route('/marvel', methods = ['GET'])
def listarMarvel():
    try:
        db = inicializarDB()
        res = []
        for i in db.listado.find({"house":"MARVEL"}):
            i["_id"] = str(i["_id"])
            res.append(i)
        return jsonify (res)
    
    except (Exception) as err:
        return str(err),500

@app.route('/obtenerPorId', methods = ['POST'])
def obtener():
    try:
        id = request.json['id']
        db = inicializarDB()
        res = db.listado.find_one({"id": str(id)}, {"_id": 0})
        return jsonify(res)
    
    except (Exception) as err:
        return str(err), 500

@app.route('/eliminar', methods=['POST'])
def eliminar():
    try:
        id = request.json ["id"]
        db = inicializarDB()
        res = db.listado.delete_one({"_id":ObjectId(id)})
        return "OK"
    except (Exception) as err:
        return str(err), 500



@app.route('/modificar', methods=['POST'])
def modificar():
    try:
        db = inicializarDB()
        id = request.json["id"]
        name = request.json ["name"]
        character = request.json ["character"]
        biography = request.json ["biography"]
        house = request.json ["house"]
        year = request.json ["year"]
        images = request.json ["images"]
        equipment = request.json ["equipment"]
        aux = {
            "name":name,
            "character":character,
            "biography":biography,
            "house":house,
            "year":year,
            "equipment":equipment,
            
        }
        db.listado.update_one({"_id":ObjectId(id)},{"$set":aux})
        return "OK"
    except (Exception) as err:
        return str(err), 500

@app.route('/peliculas', methods=['GET'])
def listarTodasMovies():
    try:
        db = inicializar_DbMovies()
        aux = []
        for x in db.listado.find({},{"_id":0}):
            aux.append(x)
        return jsonify (aux)
    except (Exception) as err:
        return str(err), 500

#-------------------------------------------------------------------------
@app.route('/agregarPelicula', methods=['POST'])
def agregarPelicula():
    try:
        db = inicializar_DbMovies()
        title = request.json["title"]
        id = request.json["id"]
        release_date = request.json["release_date"]
        overview = request.json["overview"]
        poster_path = request.json["poster_path"]
        cast = request.json["cast"]
            
            
        aux = inicializarDB()
        for element in cast:
            hero = None
            if '/' in element["character"]:
                names = element["character"].split(' / ')
                for name in names:
                    if (hero == None):
                        hero = aux.listado.find_one( { "$text": { "$search": "\"" + name + "\"" } } )
                    else:
                        break
            else:
                hero = aux.listado.find_one( { "$text": { "$search": "\"" + element["character"] + "\"" } } )

            if (hero != None):
                aux.listado.update_one({"_id":hero["_id"]},{"$push" : {"movies": {"id":id,"title":title}}}) 
                element["id_hero"] = str(hero["_id"])

        aux2 = {
            "id":id,
            "title":title,
            "release_date":release_date,
            "overview":overview,
            "poster_path":poster_path,
            "cast":cast
        }
        db.listado.insert_one(aux2)

        return "OK"
    except (Exception) as err:
        return str(err), 500

@app.route('/agregarHeroe', methods=['POST'])
def agregar():
    try:
        db = inicializarDB()
        name = request.json ["name"]
        character = request.json ["character"]
        biography = request.json ["biography"]
        house = request.json ["house"]
        year = request.json ["year"]
        images = request.json ["images"]
        cantidad_imagenes= request.json["cantidad_imagenes"]
        equipment = request.json["equipment"]
        AUX = {
                "name":name,
                "character":character,
                "biography":biography,
                "house":house,
                "year":year,
                "images":images,
                "equipment":equipment,
                "cantidad_imagenes":cantidad_imagenes,
            }  
        db.listado.insert_one(AUX)
        return "OK"
    except (Exception) as err:
        return str(err), 500

if __name__ =='__main__':
    app.run(host='backend', port='5000', debug=True)
    