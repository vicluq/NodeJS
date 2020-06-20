# Summary

- <a href='#introduction'>Introduction: Simple Server Creation</a> <br>
- <a href='#middlewares'>MiddleWares</a> <br>
- <a href='#important-methods'>Métodos importandes do Express</a><br>
- <a href='#using-params'>Adicionando Params às GET</a><br>
- <a href='#using-PUT'>PUT - Update CRUD Operation</a><br>
- <a href='#using-DELETE'>DELETE - Delete CRUD Operation</a><br>
- <a href='#routing'>Rotas</a><br>
- <a href='#cors'>CORS</a><br>
- <a href='#static-files'>Servindo Arquivos Estáticos</a><br>
- <a href='#livereload'>LiveReload</a><br>

<hr>

<h2 id='introduction'> Estrutura Básica de criação de server simples </h2>

1. Inicializa com **require('express')** e em seguida deve-se instancia uma aplicação(objeto) express pela função express, para poder usar os métodos

2. Abrir uma porta de conexão com o servidor por meio do comando **listen** e enviar o número da porta e uma callback que mostra algo no console todas vez q a conexão for estabelecida

3. Configurar que respostas serão dadas quando forem recebidas requests no servidor --> GET, POST, etc. E, também, configurar que paths ('/...') serão enviados os dados e recebidos, etc. o path da rota principal é '/'

4. Usar o cors para poder permitir entrada de elementos no server

5. Usar o body-parser para evitar problemas com dados JSON, pois ele da um parse automático!!

- OBS: se eu usar use ao invés de get e não definir um path, ele considera para QUALUQER PATH que eu por ao tentar acessar o server, ou seja, qualquer path que eu acessar por umeio de uma request no browser, os dados vão ser exibidor

<hr>

<h2 id='middlewares'>MiddleWares</h2>

```
const http = require("http");
const express = require("express");

//The express app instance actually is a valid request listener for HTTP.createServer => The requests we configure normally

const app = express();

app.use("/", (req, res, next) => {
  console.log("This is Mid 1 for All Requests", req.url);
  //set common header/stuff to requests of different paths and pass to next
  // next will be chosen according to the path user requested of course
  // that is what body-parser, cors does
  return next();
});

// express searches for the matching middleware. if there is next() it looks for the next match

app.use("/teste", (req, res, next) => {
  console.log("This is Mid 2: send HTML Code", req.url);
  return res.send({ message: "some json to test1" });
});

app.use("/teste2", (req, res, next) => {
  console.log("This is Mid 3: send HTML Code", req.url);
  return res.send({ message: "some json to test2" });
});

// this is what app.listen does under the hood
const server = http.createServer(app);
server.listen(3003, () => {
  console.log("Server On Port 3003");
});

```

<hr>

<h2 id='important-methods'>Métodos importandes do Express</h2>

- **get(path, (req, res, next))** --> configura o que acontecer ao receber req GET em um certo path do server. Dados vem na URL (_req.query_ retorna objeto exatamente igual ao body, só muda que vem tudo na URL)

- **post(path, (req, res, next))** --> configura o que acontecer ao receber req POST em um certo path do server. Dados vem no _body_

- **res.send({obj})** --> usado com a _res_ para fornecer respostas em às requests e deve ser enviado um objeto que será automaticamente transformado em json!!

- **res.json({obj})** --> usado com a _res_ para fornecer respostas em às requests e deve ser enviado um objeto que será enviado em json!!

- **res.status(num)** --> enviado em respostas do tipo POST para fornecer ao usuário se foi possível realizar a request post dependendo num que foi fornecido na res. Ex: 422 indica erro!

- **res.render(htmlFileName)** --> rederiza uma certa página HTML ao tentar acessar um path especificado na config da GET request

- **res.redirect(path)** --> redireciona o usuário para um determinado path ao fazer uma request. Ex: req post para login e após coletar dados e verificar, redireciona o user para o site logado!

<hr>

<h2 id='using-params'> Adicionando Params às GET para pegar algo específico</h2>

**app.get('/path/:id', (req, res, next))** --> Utiliza os dois pontos para indicar que há um param. Os param ficam armazenados num objeto da request chamado 'params' --> pegando o valor desse param: _res.params.id_

<hr>

<h2 id='using-PUT'> Alterando dados já colocados </h2> --> 'PUT': o mesmo da 'POST', recebe um body e tudo -> post serve tbm

**app.put('/path/:id', (req, res, next))** --> você add no parâmetro o elemento já existente(cep, id, parametro qulauqer q identifique o eleme) _req.params.id_ e troca alguma propriedade --> _req.body.x = novoValor_

_OBS: EU DEVO PASSAR O PARAMETRO DO ELEMENTO POIS ESSE PARAMETRO EU VOU PEGAR NO BACKEND E COMPARAR COM A DB SE EXISTE O ELEMNTO A SER ALTERADO, E SE EXISTIR EU APENAS REATRIBUO A ESSE ELEMENTO O NOVO VALOR DADO NO BODY!_

**Opção 2:** Se forem _dados que não devem ser mostrados na url_, eu _não passo parametro_, e _pego algo do body como referencia_ para saber o dado a ser atualizado da request mesmo.

> **Ex**: quero mudar a senha. Para saber qual usuário e senha antiga que devo procura na DB, eu peço no body da request isso, e não nos parametros para não ter que exibir na urls

<hr>

<h2 id='using-DELETE'>Deletando dados</h2>  --> 'DELETE'

_Usando params como ref_ --> basta por o path e o param q será referencia a ser procurada na DB
_Usando algo do body (conteudos sensíveis)_ --> ponho o path apenas e pego a info do body para comparar na db usando uma função e ver se tem o que quero deletar

<hr>

Mesmo eu fazendo requests em paths diferents, um path para add, outro path para checar e com os params, se sabe que são os mesmo dados pois eu forneço pela base de dados então:

                                    path add: recebe as posts, pega os dados e armazena na base de dados
                                        ||
                                        ||        OBS: eu poderia fazer tudo no mesmo path, mas para organizar preferi setar paths !=
                                        \/
                                    path check: exibe o que está na base de dados com os dados coletados pelas requests do path add
                                         \
                                          \
                                           \> /check:param: vai checar algo especificado pelo param. Pego o param fornecido pelo user no front, e no back envio para uma função que vai ver se há algo na DB e se houver exibe o dado nesse path

<hr>

<h2 id='routing'>Rotas</h2>

> Definimos rotas (paths) para o nosso aplicativo para organizar o código e separar por rotas e no índex.js do ServerSide, nós importamos essas rotas e associamos a um path

[1] primeiro cria um arquivo para a rota x e nesse arquivo importa o express
[2] Usando o metodo [Router()] do express, criamos uma nova rota
[3] Usamos ela como usamos um app, definindo o suas configs de recebimento de requests e em que paths
[4] Cada rota tem um nome '/x', mas nela não precisamos especificar seu nome ao config as requ, basta fazer normalmente
[5] No arquivo da rota, exportamos ela para usar no arquivo [index.js][6] No [index.js] usamos o app.use(pathRota, require dela) --> eu ponho o req aqui pq eu atribui ao module.exports a própria rota

> ex: se no arquivo da rota eu usar apenas '/' em algm request, eu estou falando que no app é '/x' pois no app geral '/x' é a "homepage" dessa rota

> usando rotas em arquivos diferentes e importanto, fica mais fácil de administrar os paths e em que locais são feitas as requests, etc.!!

<hr>

<h2 id='cors'>Cors</h2>

- permitir que outros endereços acessem o nosso server e façam fecth de requests POST, GET, DELETE e etc ao nosso server!
<hr>

<h2 id='static-files'> Servindo Arquivos Estáticos</h2>

> express.static('pathDaPasta') ou server.use('ajax', express.static('.'))--> criando meu próprio HTTP-SERVER

- Essa middleware (função) do express **permite que o servidor sirva arquivos estáticos (js, html, imagens) se uma pasta**. Eu forneço a pasta atrvés do seu path no parâmetro do middlware static.

- Quando eu abrir o server, ele vai está servindo e **procura por padrão direto o index.html**

> **http://localhost:3004/ajax.html** ==> ele abrirá nessa rota o arquivo se existir, pois está servindo aquela pasta e seus arquivos

<hr>

<h2 id='livereload'>Implementando LiveReload</h2>

- Instale o live reload e o connect-livereload

```
npm i --save livereload connect-livereload
```

- Crie seu server live

```
const liveServer = livereload.createServer({exts: [...], debug: T/F})
liveServer.watch(myPath)
```

- Conecte o seu App Express com o 'connect-livereload'
