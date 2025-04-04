## Instrucciones para ejecutar el proyecto

# Ejecutar el proyecto en local
1. Clonar el repositorio
2. Instalar las dependencias
```bash
 npm install
```
3. Tener instalado Node.js y npm
4. Tener nest/cli instalado
```bash
npm install -g @nestjs/cli
```

4. Levantar la base de datos. IMPORTANTE TENER DOCKER INSTALADO Y CORRIENDO 
```bash
docker-compose up -d
```

5. Levantar el servidor
```bash
npm run start:dev
```

6. Popular la base de datos con los datos de prueba. IMPORTANTE TENER MONGO DB INSTALADO Y CORRIENDO
```bash
 http://localhost:3000/api/v2/seed
```


# Tecnologías utilizadas
- NestJS
- TypeScript
- MongoDB
- Docker