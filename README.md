# sisgedopra FrontEnd

Sistema de Gestión Documental de Procesos Administrativos (SISGEDOPRA), es un software que permite modelar cualquier 
proceso administrativo de una Institución. Este software fue desarrollado por 4 estudiantes de la Universidad Santiago de Chile.

  * Felipe Gaete
  * Hugo Saavedra
  * Braulio Castro Estay 
  * Sebastián Andrés Iturra Valdés

En este repositorio encontrarás el FrontEnd del Software desarrollado bajo las siguientes herramientas:
  
  * VueJs 2 + Bootstrap 4 como Framework FrontEnd
  * WebPack como empaquetador
  * Pruebas con Karma y Jest
  
Mientras que el Backend del Software lo podrás encontrar en [https://github.com/braulioUsach/ingeso-SISGEDOPRA-api]


# Instalación y Mantención del Software Frontend

## 1. Versiones Utilizadas

* Vue 2.5.2
* Bootstrap 4.1.3

## 2. Requerimientos

* Npm >= 6.2.0
* Node >= 10.8.0

## 3. Instalación

	cd /var/www/

Una vez ahí, se debe clonar el repositorio perteneciente al proyecto, este proyecto está bajo el software de control de versiones llamado github y hospedado en github.com, para clonar el repositorio se debe ejecutar el siguiente comando, 

	git clone https://github.com/siturra/SISGEDOPRA.git

Una vez ejecutado el comando comenzara la clonación del repositorio. Este repositorio contiene el proyecto, sin las librerías externas de JavaScript utilizadas, por ende, se debe a proceder a instalarlas de la forma que se describe a continuación:

Cuando esté el repositorio clonado, se deberá ingresar a él. Está ubicado en el directorio SISGEDOPRA que se acabó de crear al ejecutar el comando anterior.

	cd SISGEDOPRA

Una vez dentro del directorio, y al usar un Backend como endpoint, se debe configurar se debe configurar en la ruta `config/prod.env.js`, 
la variable ``VUE_APP_BACKEND_API_URL`` que usa la IP o el dominio al cual se conecta, agregando http:// o https:// según corresponda.
  
  VUE_APP_BACKEND_API_URL: '"http://18.213.206.200"'

Luego, la instalación de las librerías JavaScript (JS) necesarias:

	npm install

Luego, se debe compilar el JavaScript (JS):

	npm run build

Este comando creara una carpeta llamada ``dist``, esta carpeta contendra todo el proyecto compilado y listo para ser usado en producción

## 4. Mantención

Si en un futuro el sistema es actualizado, deberás dirigirte al directorio donde se encuentra hospedado el proyecto, ejemplo:

	cd /var/www/SISGEDOPRA

Una vez dentro, deberás ejecutar el comando para actualizar el repositorio

	git pull 

Instalar las librerías nuevas de JavaScript (JS) en caso de que existieran:

	npm install

Y finalmente compilar el JavaScript (JS)

	npm run build

## 5. Soporte

Si a pesar de todo resulta algún error y no lo puedes solucionar, contacta a:

Sebastián Iturra <sebastian.iturra@usach.cl>, Braulio Castro <braulio.castro@usach.cl>, Felipe Gaete <felipe.gaete@usach.cl> o Hugo Saavedra <hugo.saavedra@usach.cl>
