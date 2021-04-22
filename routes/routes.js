const express = require("express");
const router = express.Router();
const Album = require("./../models/Album.model");
const Purchase = require("./../models/Purchase.model");

//Task 2.1: Create route `POST /albums`

router.post("/albums", (req, res) => {
	//Opción 1: crear un objeto con los datos
	// const albumData = {
	//   performer: req.body.performer,
	//   title: req.body.title,
	//   cost: req.body.cost
	// }

	//Opción 2: crear las variables por separado
	// const performer = req.body.performer
	// const title = req.body.title
	// const cost = req.body.cost

	//Opción 3: desestructurar las variables de req.body
	const { performer, title, cost } = req.body;

  //C(rud) -> creamos elemento en base de datos con las variables recibidas en req.body
	Album.create({ performer, title, cost })
		.then((createdAlbum) => {
			res.json({ data: createdAlbum });
		})
		.catch((error) => {
			console.error(error);
		});
});


//Task 2.2: Create route `GET /albums`
router.get("/albums", (req, res) => {

  //Buscamos todos los elementos en base de datos con una query {} y recibiremos un array
	Album.find({})
		.then((allAlbums) => {

      //Si queremos hacer una validación conforme hay datos en el resultado, podemos incluír un if statement
			if (allAlbums.length === 0) {
				res.json({ data: "error, no data retrieved" });
			} else {
				res.json({ data: allAlbums });
			}
		})
		.catch((error) => {
			console.error(error);
		});
});

//Task 2.3: Create route `GET /albums/:albumId`

router.post("/albums/:albumId", (req, res) => {

  //guardamos la id de la URL con el valor en req.params
  const id = req.params.albumId;


  //Hacemos una búsqueda con ese id
	Album.findOne({_id: id}, { performer, title, cost })
		.then((foundAlbum) => {
			res.json({ data: foundAlbum });
		})
		.catch((error) => {
			console.error(error);
		});
});


//Extra: ejemplo de input de búsqueda múltiple
router.get("/search", (req, res) => {

	//ejemplo de buscador de un solo input en varios parámetros
	const { search } = req.body.search;

	//const id = req.params.test;

	Album.find({ $or: [{ name: search }, { title: search }] })
		.then((foundAlbum) => {
			res.json({ data: foundAlbum });
		})
		.catch((error) => {
			console.error(error);
		});
});

//Task 2.4: Create route `POST /albums/:albumId`

router.post("/albums/:albumId", (req, res) => {
	
  //guardamos la id de la URL con el valor en req.params
	const id = req.params.albumId;

  //guardamos los valores nuevos con los que actualizaremos el documento de la base de datos
	const { performer, title, cost } = req.body;

  //¡Importante! Cuando actualizamos, debemos pasar el tercer parámetro {new: true} a la query o recibiremos el objecto preactualizado 
	Album.findOneAndUpdate({ _id: id }, { performer, title, cost }, { new: true })
		.then((updatedAlbum) => {
			res.json({ data: updatedAlbum });
		})
		.catch((error) => {
			console.error(error);
		});
});

//Task 2.5: Create route `POST /albums/:albumId/delete`
router.post("/albums/:albumId/delete", (req, res) => {

	//guardamos la id de la URL con el valor en req.params
	const id = req.params.albumId;

	Album.findOneAndDelete({_id: id})
		.then(() => {
      //en este caso, no necesitamos trabajar con los datos de la promesa resuelta, así que no hace falta pasar nada en el then
			res.sendStatus(204);
		})
		.catch((error) => {
			console.error(error);
		});
});

//Task 3: Create route `POST /purchases` and populate

router.post("/purchases", (req, res) => {

  //guardamos los valores del formulario que vienen en req.body
  const { user, album } = req.body;

  //creamos el nuevo documento en la base de datos
	Purchase.create({ user, album })
		.then((createdPurchase) => {

      //¡importante! debemos hacer un find del elemento que acabamos de crear antes de popularlo
			console.log("created purchase", createdPurchase);

      //nos guardamos la id del elemento creado para poder buscar
			const id = createdPurchase._id;

			Purchase.findById(id)
        //aquí hacemos los populates, indicando de qué colección debemos popular los datos (como hemos indicado en el modelo de purchase)
				.populate("album")
				.populate("user")

        //después de los populates, podemos enlazar el then y el catch con la resolución de la promesa
				.then((populatedPurchase) => {
					console.log("populatedPurchase", populatedPurchase);
					res.json({ data: populatedPurchase });
				})
				.catch((error) => {
					console.error(error);
				});
		})
		.catch((error) => {
			console.error(error);
		});
});

module.exports = router;
