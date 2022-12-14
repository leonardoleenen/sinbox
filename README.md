# Abstract 

Sinbox (Bandeja de entrada simplificada) es una aplicación que permite administrar procesos administrativos (del formato expediente) para usuarios internos y externos. 

# Layout 
La aplicación cuenta con 3 componentes: La Aplicación web, dos motores de base de datos y un motor para procesar reglas de negocios. La aplación es 100% web y se puede acceder desde cualquier navegador. 

## Aplicación WEB
Tal como se ha mencionado anteriormente la aplicación es 100% una aplicación WEB la cual corre en un contender o motor Web (apache, nginx, etc). Dicha aplicación está construida con el siguiente stack: 

* NodeJS 17.x
* NextJS 
* TypeScript 
* TailwindCSS 

### Despliege en Staging o Producción modo Cloud 
Para poder desplegar la aplicación es necesario un contendor web. En el caso de desplegar en la nube recomendamos el uso de Vercel. Para ello se debe configurar una cuenta en vercel (https://vercel.com/) y declarar las variables de ambiente que se mencionan a continuación: 

FIREBASE=<FIREBASE_KEY_BASE64>

```bash
CUBEJS_DEV_MODE=false
CUBEJS_DB_TYPE=postgres
CUBEJS_DB_HOST=<URL_SERVER_POSTGRES>
CUBEJS_DB_NAME=sinbox
CUBEJS_DB_USER=<USER_POSTGRES>
CUBEJS_DB_PASS=<DB_PASSWORD>
CUBEJS_API_SECRET=<CUBEJS SECRETE>
CUBEJS_EXTERNAL_DEFAULT=true
CUBEJS_SCHEDULED_REFRESH_DEFAULT=true
CUBEJS_WEB_SOCKETS=true
PORT=14000

KNEX_DB_NAME=sinbox
KNEX_DB_USER=<USER_POSTGRES>
KNEX_DB_PASSWORD=<DB_PASSWORD>
KNEX_HOST=<URL_SERVER_POSTGRES>
API_URL=<URL_SERVER_POSTGRES>
```

## Motores de base de datos 
La aplicación trabaja con dos tipos de motores de datos: Un motor de Tipo noSQL el cual cubre las necesidades operativas de la solución y un motor de tipo SQL (postgres) el cual está orientado a cubrir las necesidades analíticas de la solución. 


### Deploy Cloud
Para hacer el deploy de la solución ON CLOUD es indispensable contar con servicios Cloud de Base De Datos. Para ello se propone:

* Firebase https://firebase.google.com
* Postgres https://www.elephantsql.com

## Motor para procesar las reglas de negocio 
Para dicho fin se ha implementado KIE (https://kogito.kie.org/) como motor DMN1.3. Este motor tiene la capacidad de procesar reglas de inferencia escritas en DNMN

### Deploy onCloud
Debido a que este servicio no se puede contratar ON CLOUD se ha configurado un servidor para tal fin. Para poder levantar el servicio se debe correr estos comandos en dicho servidor (no se proveen las credenciales en forma pública). 

1. Acceder al server mediante un XWindow 
2. Abrir una terminal 

```bash 
cd kie_sandbox_extended_services 
./kie_sandbox_extended_services 

```
