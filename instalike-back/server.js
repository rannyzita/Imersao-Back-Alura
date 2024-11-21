import express from "express";

const posts = [
    {
        id: 1,
        descricao: "Uma foto teste",
        imagem: "https://placecats.com/millie/300/150"
    },
    {
        id: 2,
        descricao: "Gato fofo dormindo",
        imagem: "https://placekitten.com/200/300"
    }
];

const app = express();
app.use(express.json());

app.listen(3000, () => {
    console.log("Servidor escutando...");
});

// rota
app.get("/posts", (req, res) => {
    // 200 = requisição bem sucedida
    res.redirect("https://http.cat/200");
    res.status(200).json(posts);
});

// criano um metodo especifico para buscar o id de algm post
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
