import {getTodosPosts, criarPost, atualizarPost, removerPost} from "../models/postsModel.js";
import fs from "fs";
import gerarDescricaoComGemini from "../services/geminiService.js";

export async function listarPosts(req, res) {
    const posts = await getTodosPosts();
    res.status(200).json(posts);
}

// sinonimos para espelhar as functions do model
export async function postarNovoPost(req, res) {
    const novoPost = req.body;

    try {
        const postCriado = await criarPost(novoPost);
        res.status(200).json(postCriado);
    } catch (erro) {
        console.error(erro.message);
        // erro 500, erro interno no servidor  
        res.status(500).json({"Erro":"Falha na requisição."})
    }
}

export async function uploadImagem(req, res) {
    const novoPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    }

    try {
        const postCriado = await criarPost(novoPost);
        const imagemAtualizada = `uploads/${postCriado.insertedId}.jpg`;

        fs.renameSync(req.file.path, imagemAtualizada);
        res.status(200).json(postCriado);
    } catch (erro) {
        console.error(erro.message);
        // erro 500, erro interno no servidor  
        res.status(500).json({"Erro":"Falha na requisição."})
    }
}

export async function atualizarNovoPost(req, res) {
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.jpg`;
    
    try {
        const imgBuffer = fs.readFileSync(`uploads/${id}.jpg`);
        const descricao = await gerarDescricaoComGemini(imgBuffer);
        
        const novoPost = {
            imgUrl: urlImagem,
            descricao: descricao,
            alt: req.body.alt
        }

        const postCriado = await atualizarPost(id, novoPost);
        res.status(200).json(postCriado);
    } catch (erro) {
        console.error(erro.message);
        // erro 500, erro interno no servidor  
        res.status(500).json({"Erro":"Falha na requisição."})
    }
}

export async function removerPostUser(req, res) {
    try {
        const { id } = req.params; // Pega o ID da URL
        const resultado = await removerPost(id); // Chama a função do model
        if (resultado.deletedCount === 1) {
            res.status(200).json({ mensagem: "Post removido com sucesso!" });
        } else {
            res.status(404).json({ mensagem: "Post não encontrado!" });
        }
    } catch (erro) {
        res.status(500).json({ mensagem: "Erro ao remover o post.", erro });
    }
}


