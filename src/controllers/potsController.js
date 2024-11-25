import {
    buscarPostPorID,
    getTodosPosts,
    criarPost, atualizarPost,
} from "../models/postsModel.js";

import gerarDescricaoComGemini from "../services/geminiService.js"

import fs from 'fs';

export async function listarPosts(req, res) {
    const posts = await getTodosPosts();
    res.status(200).json(posts);
}

export async function mostrarPost(req, res) {

    const index = buscarPostPorID(req.params.id);
    const posts = await getTodosPosts();

    res.status(200).json(posts[index]);
}

export async function postarNovoPost(req, res) {
    const novoPost = req.body;

    try {
        const postCriado = await criarPost(novoPost);
        res.status(200).json(postCriado);
    } catch (e) {
        console.error(e.message)
        res.status(500).json({
            "Erro": "Falha na requisição"
        })
    }
}

export async function uploadImagem(req, res) {
    const novoPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: "",
    };

    try {
        const postCriado = await criarPost(novoPost);
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;
        fs.renameSync(req.file.path, imagemAtualizada);
        res.status(200).json(postCriado);
    } catch (e) {
        console.error(e.message)
        res.status(500).json({
            "Erro": "Falha na requisição"
        })
    }
}

export async function atualizarNovoPost(req, res) {

    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.png`;

    try {

        const imageBuffer = fs.readFileSync(`uploads/${id}.png`);

        const descricao = await gerarDescricaoComGemini(imageBuffer);

        const postAtualizado = {
            imgUrl: urlImagem,
            descricao: descricao,
            alt: req.body.alt,
        };

        const atualizaPost = atualizarPost(id, postAtualizado);
        res.status(200).json(atualizaPost);
    } catch (e) {
        console.error(e.message)
        res.status(500).json({
            "Erro": "Falha na requisição"
        })
    }

}

