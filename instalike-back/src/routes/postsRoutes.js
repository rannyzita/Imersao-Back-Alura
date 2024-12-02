import express from "express";
import { listarPosts } from "../controllers/postsController.js";

const routes = (app) => {
    // Essencial para receber dados em formato JSON nas requisições POST, PUT, etc.
    app.use(express.json());

    // rota para lidar com requisições GET para a URL /posts.
    // 1. Utiliza a função `getTodosPosts` para obter todos os posts.
    // 2. Envia uma resposta HTTP com status 200 (sucesso) e o array de posts no formato JSON.
    app.get("/posts", listarPosts);
}

export default routes;