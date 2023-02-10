const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

// const DB_URL = "mongodb+srv://admin:C4dqiihlUXHYT7cc@cluster0.03neohq.mongodb.net";
const DB_URL = "mongodb+srv://admin:SyBP3mWFQu5v3HI7@cluster0.mqm0oat.mongodb.net";
const DB_NAME = "ThaisDB";

async function main() {
  console.log("Conectando com o banco de dados...")
  const client = await MongoClient.connect(DB_URL);
  const db = client.db(DB_NAME);
  const collection = db.collection("Items")
  console.log("Banco de dados conectado com sucesso!")


  const app = express();

  app.use(express.json());

  app.get("/", function (req, res) {
    res.send("hello, world!");
  });

  app.get("/oi", function (req, res) {
    res.send("Olá, mundo!");
  });

  const itens = ["Rick Sanchez", "Morty Smith", "Summer Smith"]


  app.get("/item", async function (req, res) {
    const documentos = await collection.find().toArray()
    res.send(documentos);
  });

  app.get("/item/:id", async function (req, res) {
    const id = req.params.id;
    const item = await collection.findOne({ _id: new ObjectId(id) });
    res.send(item);
  });

  app.post("/item", async function (req, res) {
    // console.log(req.body);
    const item = req.body;
    await collection.insertOne(item)
    // itens.push(item.nome);
    res.send(item);
  });

  //endpoint UpDate
  app.put("/item/:id", async function (req, res) {
    const id = req.params.id;
    const body = req.body;

    // console.log(id, body);
    await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: body }
    );
    res.send(body);
  });

  app.delete("/item/:id", async function (req, res) {
    const id = req.params.id;

    await collection.deleteOne(
      { _id: new ObjectId(id) }
    );
    res.send("item deletado com sucesso!");
  })
  app.listen(3000, () =>
    console.log("Servidor rodando em http://localhost:3000")
  );
}

main();
