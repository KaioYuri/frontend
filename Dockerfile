# Dockerfile para o frontend
FROM node:18

WORKDIR /app

# Copia apenas o package.json e package-lock.json para instalar dependências
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos do frontend
COPY . .

# Exponha a porta onde o frontend estará rodando
EXPOSE 3000

# Comando para iniciar o frontend
CMD ["npm", "run", "dev"]
