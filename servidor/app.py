from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

ARQUIVO_JSON = 'usuarios.json'

def ler_usuarios():
    if not os.path.exists(ARQUIVO_JSON):
        return []
    try:
        with open(ARQUIVO_JSON, 'r', encoding='utf-8') as f:
            return json.load(f)
    except:
        return []

def salvar_usuarios(usuarios):
    with open(ARQUIVO_JSON, 'w', encoding='utf-8') as f:
        json.dump(usuarios, f, indent=4, ensure_ascii=False)

@app.route('/cadastro', methods=['POST'])
def cadastro():
    dados = request.json
    usuarios = ler_usuarios()
    
    if any(u['usuario'] == dados['usuario'] for u in usuarios):
        return jsonify({"erro": "Usuario ja existe"}), 400
    
    if any(u['email'] == dados['email'] for u in usuarios):
        return jsonify({"erro": "Email ja cadastrado"}), 400
    
    usuarios.append(dados)
    salvar_usuarios(usuarios)
    
    return jsonify({"mensagem": "Sucesso"}), 201

@app.route('/login', methods=['POST'])
def login():
    dados = request.json
    usuarios = ler_usuarios()
    
    for u in usuarios:
        if u['usuario'] == dados['usuario'] and u['senha'] == dados['senha']:
            return jsonify({
                "status": "sucesso", 
                "nome": u.get('nome')
            }), 200
            
    return jsonify({"status": "erro"}), 401

if __name__ == '__main__':
    app.run(port=5110, debug=True)