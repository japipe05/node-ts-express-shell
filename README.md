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
1..1sobre el proyecto:   docker run -it -e NGROK_AUTHTOKEN=2ZYG1BQhgC96HSLZgedJTb2Vp0a_3Cpu8B7n44eUBTNnbUR1y ngrok/ngrok http 192.423.2341.12431243:3000
nota:mi ip : 192.423.2341.12431243
2. https://ngrok.com/download