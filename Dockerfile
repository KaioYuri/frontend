# Imagem node a ser usada
FROM node:18

# Definir diretório de trabalho no contêiner
WORKDIR /app

# Copiar package.json e package-lock.json para instalar dependências
COPY package.json package-lock.json ./

# Instalar dependências de desenvolvimento
RUN npm install

# Copiar todo o código-fonte da aplicação
COPY . .

# Porta que a aplicação irá expor
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["npm", "run", "dev"]
