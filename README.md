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

5. Crear un archivo .env en la raíz del proyecto y agregar las variables de entorno necesarias. Puedes usar el archivo .env.example como referencia.
```bash
# .env
MONGO_URI=mongodb://localhost:27017/mi_base_de_datos
PORT=3000
DEFAULT_LIMIT=10
````

6. Levantar el servidor
```bash
npm run start:dev
```

7. Popular la base de datos con los datos de prueba. IMPORTANTE TENER MONGO DB INSTALADO Y CORRIENDO
```bash
 http://localhost:3000/api/v2/seed
```


# Tecnologías utilizadas
- NestJS
- TypeScript
- MongoDB
- Docker