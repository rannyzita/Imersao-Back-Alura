import express from "express";

const app = express();
app.listen(3000, () => {
    console.log("Servidor escutando...");
});

// rota
app.get("/", (req, res) => {
    res.status(200).send("Bem vindo a imersão backend...");
});