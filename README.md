# 🚀 Snack to GitHub Automation

Este projeto permite automatizar a exportação de atividades do Expo Snack diretamente para repositórios do GitHub, utilizando uma extensão de navegador e um script auxiliar em Python.

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

* **Google Chrome** ou **Firefox**.
* **Python 3.x** instalado.
* **Git** logado.
---

## 🛠️ Guia de Instalação

### 1. Configuração da Extensão (Navegador)

Para que o script consiga interagir com o navegador, é necessário carregar a extensão inclusa:

1. Abra o seu navegador e acesse o link:
* **Chrome:** `chrome://extensions/`
* **Firefox:** `about:debugging#/runtime/this-firefoxabout:debugging#/runtime/this-firefox`


2. No canto superior direito, habilite o **Modo do Desenvolvedor** (*Developer mode*). Firefox: **Carregar Extensão Temporaria**
3. Clique no botão **Carregar sem compactação** (*Load unpacked*).
4. Selecione a pasta `/extension` presente na raiz deste repositório. Firefox: **Selecione o arquivo manifest.json**

### 2. Configuração do Script Python

Agora, vamos configurar o ambiente que processará os dados:

1. Acesse a pasta da ferramenta via terminal:
```bash
cd ./tool

```


2. (Recomendado) Crie e ative um ambiente virtual:
```bash
# Criar o ambiente
python -m venv venv

# Ativar no Windows:
.\venv\Scripts\activate

# Ativar no Linux/Mac:
source venv/bin/activate

```


3. Instale as dependências necessárias:
```bash
python -m pip install -r requirements.txt
```

4.0. Antes, edite o 'main.py' na linha 30, ou na variavel 'repo_clone' troque o 'L-0-W' para o nome da sua conta do github

4. Inicie o script:
```bash
python main.py

```



---

## 🚀 Como Usar

Para que a automação funcione corretamente, siga estes passos rigorosamente:

1. **Prepare o Repositório:** Crie um repositório no GitHub com o nome da sua atividade (ex: `atividade-05`).
2. **Sincronize os Nomes:** No [Expo Snack](https://snack.expo.dev/), o título do seu projeto **deve ser exatamente igual** ao nome do repositório no GitHub.
> ⚠️ **Atenção:** Não utilize espaços. Se o repo for `projeto-final`, o Snack deve se chamar `projeto-final`.


3. **Foco na Aba:** Se você tiver várias abas do Snack abertas, o programa capturará a primeira que encontrar. Mantenha apenas a aba de interesse aberta para evitar erros.
4. **Execução:** Com o `main.py` rodando, realize o procedimento no Snack e a ferramenta cuidará do restante.

---

## ⚠️ Observações e Bugs

Este projeto ainda está em desenvolvimento. Caso encontre comportamentos inesperados:

* Verifique se o nome do repositório e do Snack são idênticos.
* Certifique-se de que a extensão está ativa.
* **Contribua:** Caso ache um erro, sinta-se à vontade para [abrir uma Issue](https://www.google.com/search?q=https://github.com/seu-usuario/seu-repo/issues).

---

Seria útil se eu gerasse também um arquivo `.gitignore` para evitar que sua pasta `venv` e outros arquivos temporários sejam enviados para o GitHub?
