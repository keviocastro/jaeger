
# Exemplo de Integração do Jaeger com Node.js

Este repositório contém um exemplo simples de como integrar o Jaeger para rastreamento distribuído de serviços em uma aplicação Node.js. O exemplo consiste em dois serviços simples que se comunicam e enviam traces para o Jaeger para monitoramento e análise.

## Pré-requisitos

Antes de iniciar, certifique-se de ter instalado em sua máquina:

Node.js (v12 ou superior)
Docker
Jaeger Client Libraries (para Node.js, incluído via npm)

## Configuração do Projeto

1. Clone o repositório:

```
git clone https://github.com/keviocastro/jaeger.git
cd jaeger
```

2. Instale as dependências:

```
npm install
```

3. Iniciando o jaeger:

```
docker-compose up -d jaeger
```

4. Executando os Serviços:

Inicie o serviço 1:

```
node service1.js
```

Inicie o serviço 2:

```
node service2.js
```

De forma alternativa você pode iniciar tudo em docker:

```
docker compose up 
```

## Visualizando os Traces no Jaeger UI

1. Acesse o Jaeger UI:

Abra o Jaeger UI em seu navegador: http://localhost:16686.

2. Consulte os Traces:

* Execute algumas solicitações ao serviço 1 para gerar traces.

* No Jaeger UI, você poderá visualizar e analisar os traces gerados pelas chamadas entre os serviços.

# Estrutura do Projeto

```
jaeger/
├── docker-compose.yml
├── package.json
└── tracer.js
└── service1.js
└── service2.js
```
* tracer: Código da configuração de conexão com jaeger,=.
* service1.js: Código-fonte do serviço 1 que envia requisições para o service 2 tambem envia traces para o Jaeger.
* service2.js: Código-fonte do serviço 2 que recebe requisições e também envia traces para o Jaeger.
* docker-compose.yml: Arquivo de configuração do Docker Compose para executar o Jaeger all-in-one e services em docker.
* package.json: Arquivo de manifesto do Node.js com as dependências do projeto.
