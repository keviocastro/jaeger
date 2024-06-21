
# Exemplo de Integração do Jaeger com Node.js

Este repositório contém um exemplo simples de como integrar o Jaeger para rastreamento distribuído de serviços em uma aplicação Node.js. O exemplo consiste em dois serviços simples que se comunicam e enviam traces para o Jaeger para monitoramento e análise.

## Pré-requisitos

Antes de iniciar, certifique-se de ter instalado em sua máquina:

Node.js (v12 ou superior)
Docker (opcional, para executar o Jaeger com Docker Compose)
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

3. Configuração do Jaeger:

* Certifique-se de que o Jaeger esteja configurado corretamente. Você pode usar o Jaeger all-in-one via Docker para simplificar o processo de configuração.

* Exemplo de docker-compose.yml para executar o Jaeger all-in-one:

```
version: '3'
services:
  jaeger:
    image: jaegertracing/all-in-one:1.22
    ports:
      - "6831:6831/udp"
      - "16686:16686"
    environment:
      - COLLECTOR_ZIPKIN_HTTP_PORT=9411
      - COLLECTOR_THRIFT_PORT=6831
      - LOG_LEVEL=debug
```

docker-compose up -d jaeger

4. Executando os Serviços:

Inicie o serviço 1:

```
npm start
```

## Visualizando os Traces no Jaeger UI

1. Acesse o Jaeger UI:

Abra o Jaeger UI em seu navegador: http://localhost:16686.

2. Consulte os Traces:

* Execute algumas solicitações ao serviço 1 para gerar traces.

* No Jaeger UI, você poderá visualizar e analisar os traces gerados pelas chamadas entre os serviços.

# Estrutura do Projeto

```
exemplo-jaeger-node/
├── README.md
├── docker-compose.yml
├── package.json
├── package-lock.json
└── service1.js
└── service2.js
```

* service1.js: Código-fonte do serviço 1 que envia requisições para o service 2 tambem envia traces para o Jaeger.
* service1.js: Código-fonte do serviço 1 que envia traces para o Jaeger.
* docker-compose.yml: Arquivo de configuração do Docker Compose para executar o Jaeger all-in-one e services em docker.
* package.json: Arquivo de manifesto do Node.js com as dependências do projeto.
