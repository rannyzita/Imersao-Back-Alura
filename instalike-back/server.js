import express from "express";
import routes from "./src/routes/postsRoutes.js";
 
// cria uma instância do Express, que será utilizada para criar o servidor web.
const app = express();
routes(app);

// inicia o servidor na porta 3000 e exibe uma mensagem no console quando o servidor estiver ouvindo.
app.listen(3000, () => {
    console.log("Servidor escutando...");
});

// criando um metodo especifico para buscar o id de algm post
function buscarPostPorId(id) {
    return posts.findIndex((post) => {
        return post.id === Number(id);
    })
};

// :id quer dizer q vou acessar algm var id
app.get("/posts/:id", (req, res) => {
    // 200 = requisição bem sucedida
    const index = buscarPostPorId(req.params.id);
    res.status(200).json(posts[index]);
});
