# writeToFile

## Este script se creó para utilizar Postman para capturar la información de las API's de VTEX

Se utiliza la librería Newman y NodeJS para lograr el objetivo, ya que Postman por su diseño, no permite guardar la respuesta de las consultas.

Aqui les dejo un pequeño tutorial de que hace el archivo ❤️

Empezemos!


![Imagen](https://media2.giphy.com/media/LpkBAUDg53FI8xLmg1/giphy-downsized.gif?cid=6104955emxntwzb6xhnuqxqth33mjlooqos801hzwdcy53si&rid=giphy-downsized.gif&ct=g)

El script consta de 3 archivos que son el corazón del proceso:

1. coleccion.json
2. data.csv
3. writeToFile.js

_Los otros archivos corresponden a los módulos y/o dependencias necesarias para correr la aplicación_ 

### coleccion.json

Dentro del archivo coleccion.json es donde Newman lee el endpoint que va a ser llamado durante la consulta:
```
	"request": {
	"_comment":"Aqui va el método y la URL de VTEX que se utiliza, ademas las credenciales en el header",
	"method": "GET",
		"header": [
		"Accept: application/vnd.vtex.pricing.v3+json",
		"Content-Type: application/json",
    "X-VTEX-API-AppKey: ",
		"X-VTEX-API-AppToken: "
		],
		"url": "https://api.vtex.com/{{accountName}}/pricing/prices/{{skuID}}/computed/{{priceTableId}}" 
}
```

Para este caso en particular, se ocupó el endpoint "Get Computed Price by price table or trade policy" el cual está en la [documentación]([url](https://developers.vtex.com/docs/api-reference/pricing-api#get-/prices/-itemId-/computed/-priceTableId-)) 

### Consideraciones:

1. Se debe tener en cuenta, el uso de los `headers` según corresponda asi como las credenciales `X-VTEX-API-AppKey` y `X-VTEX-API-AppToken` deben tener asignados los permisos necesarios para este tipo de acciones.
2. En la variable `url` es donde finalmente se agrega el endpoint a consultar, en este caso en particular se agregan como variables `{{accountName}}, {{skuID}} y {{priceTableID}}` para efectos de ocupar un archivo CSV donde se consulta la información (un runner).


### data.csv

1. Este archivo es el encargado de agregar la recursividad al runner, de él se extrae la información del punto 2
2. La estructura puede cambiar, dependiendo de la `url` que se utilice, no se limita solamente al ejemplo del endpoint.
3. El CSV debe estar separado por `,` y no `;`


