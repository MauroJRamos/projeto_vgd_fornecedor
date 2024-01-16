# Usando a imagem base do Node.js para construir a imagem
FROM node:14-alpine

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia o arquivo package.json e yarn.lock para o diretório de trabalho
COPY package*.json yarn.lock ./

# Instala as dependências do projeto
RUN yarn install

# Copia todos os arquivos do projeto para o diretório de trabalho
COPY . .

# Compila o projeto React
RUN yarn build

# Define a porta em que o aplicativo irá escutar
EXPOSE 3000

# Comando para executar o aplicativo
CMD [ "yarn", "start" ]
