# Rest Project + TypeScript

Este proyecto previamente inicializado tiene todo lo necesario para trabajar con TypeScript, Express y Rest.

Cada paso de su configuración ya se ha realizado previamente en el curso, por lo que solo es necesario clonar el proyecto y comenzar a trabajar.


## Instalación

1. Clonar .env.template a .env y configurar las variables de entorno
2. Ejecutar `npm install` para instalar las dependencias
3. En caso de necesitar base de datos, configurar el docker-compose.yml y ejecutar `docker-compose up -d` para levantar los servicios deseados.
4. Ejecutar `npm run dev` para levantar el proyecto en modo desarrollo

## Base de datos mongoose
1. > npm i mongoose

## Encryptar contraseñas
1. npm i bcryptjs

## jsonwebtoken para las sesiones
1. npm i jsonwebtoken

## Mails
a. https://github.com/Klerith/node-noc/blob/fin-seccion-12/src/presentation/email/email.service.ts
b. https://myaccount.google.com/security
c. https://myaccount.google.com/u/0/apppasswords?rapt=AEjHL4MTsjAPRWzUmuirixez5ttDVSzCbkRGCQoFk4UJrdkdshbPObbVuXPk-sDKrMipwDmhzh1TUq1-P3ORxf5N-yGuKWT27YkqjKSHaowuv4YhDdKL8HI
1. > npm i nodemailer


## publicar un puerto en producción 
1. inicio sesion https://dashboard.ngrok.com/get-started/your-authtoken
1..1 docker run -it -e NGROK_AUTHTOKEN=2ZYG1BQhgC96HSLZgedJTb2Vp0a_3Cpu8B7n44eUBTNnbUR1y ngrok/ngrok http  253.2345.2345.2345:3000
nota 253.2345.2345.2345: mi ip 4 del pc y el puerqto que corre el proyecto

o > docker run -it --env-file .env ngrok/ngrok http 253.2345.2345.2345:3000
2. https://ngrok.com/download

si lo cierro 

docker ps -a

docker exec -it NOMBRE_O_ID_DEL_CONTENEDOR /bin/sh
docker start d02a10dfe48b
docker exec -it 0e8df8024891 /bin/sh

ngrok tcp 3000