import express from "express";
import multer from "multer";
import { listarPosts, postarNovoPost, uploadImagem} from "../controllers/postsController.js";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({dest:"./uploads", storage});

// linux ou mac
// const upload = multer({dest:"./uploads", storage});

// verbos https
// get(pegar), post(criar), delete, put(att)
const routes = (app) => {
    // Essencial para receber dados em formato JSON nas requisições POST, PUT, etc.
    app.use(express.json());

    // rota para lidar com requisições GET para a URL /posts.
    // 1. Utiliza a função `getTodosPosts` para obter todos os posts.
    // 2. Envia uma resposta HTTP com status 200 (sucesso) e o array de posts no formato JSON.
    app.get("/posts", listarPosts);
    // rota para criar post
    app.post("/posts", postarNovoPost);
    // rota, em que recebe um unico arquivo
    app.post("/upload", upload.single("imagem"), uploadImagem);
}

export default routes;
