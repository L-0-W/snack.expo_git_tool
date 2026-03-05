from flask import Flask, request
from flask_cors import CORS
from git import Repo
import requests
from zipfile import ZipFile
from io import BytesIO
import shutil



app = Flask(__name__)
CORS(app)

@app.route('/executar', methods=['GET'])
def executar():
    # Pega a URL enviada pela extensão
    url_download = request.args.get('url')
    
    if url_download:
        print(f"🚀 URL Recebida: {url_download}")
        
        gitRepName = url_download.split('|')[1]
        file = url_download.split('|')[0]
        
        try:
            shutil.rmtree(gitRepName)
        except:
            print("Pasta não iniciada!, continuando")

        try:    
            repo_clone = f"https://github.com/L-0-W/{gitRepName}.git"
            repo = Repo.clone_from(repo_clone, gitRepName)
        except:
            print("Não foi possivel clonar repositorio")

        try:
            response = requests.get(file)
            response.raise_for_status()
        except:
            print("Não foi possivel buscar arquivo .zip")


        try:
            with ZipFile(BytesIO(response.content), 'r') as zip_ref:
             for zip_info in zip_ref.infolist():
                if zip_info.filename != f"{gitRepName}/":
                    print(zip_info.filename)    
                    zip_ref.extract(zip_info.filename)
        except:
            print("Não foi possivel extrair arquivos de .zip")        

        try:
            repo.git.add(".")
            repo.git.commit(f"-m 'enviando atividade: {gitRepName}' ")
            origin = repo.remote(name='origin')
        except:
            print("Não foi possivel adicinar itens para commit")
        
        try:      
            origin.push() 
            print("✅ Push completo!")
        except:
            print("Não foi possivel enviar.")

        return "Ok", 200
    
    return "Nenhuma URL recebida", 400

if __name__ == '__main__':
    print("🔥 Servidor de Automação Rodando em http://localhost:3000")
    print("Aguardando capturas da extensão...")
    app.run(port=3000)