import express from "express";
import multer from "multer";
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost, removerPostUser} from "../controllers/postsController.js";
import cors from "cors";

const corsOption = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200
}

// Configura o armazenamento para uploads de arquivos
const storage = multer.diskStorage({
  // Define o diretório de destino para os arquivos
    destination: function (req, file, cb) {
    cb(null, 'uploads/');
    },
  // Define o nome do arquivo no destino
    filename: function (req, file, cb) {
    cb(null, file.originalname);
    }
});

// Cria uma instância do multer com a configuração de armazenamento
const upload = multer({ dest: "./uploads", storage });

// Define as rotas da aplicação
const routes = (app) => {
  // Habilita o parsing de JSON no corpo das requisições
    app.use(express.json());
    // avisando que pode chegar outro host
    app.use(cors(corsOption)); 

  // Rota para listar todos os posts
    app.get("/posts", listarPosts);

  // Rota para criar um novo post
    app.post("/posts", postarNovoPost);

  // Rota para upload de um único arquivo (imagem)
  // O middleware `upload.single('imagem')` trata o upload do arquivo, uma img por vez
  // O arquivo será armazenado no diretório 'uploads' com o nome original
    app.post("/upload", upload.single("imagem"), uploadImagem);

    // vamos deixar publico a visualização de imagens do nosso servidor
    app.put("/upload/:id", atualizarNovoPost);

    app.delete("/posts/:id", removerPostUser);
};

export default routes;