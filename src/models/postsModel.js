
import 'dotenv/config';
import conectarAoBanco from "../config/dbConfig.js";
import {ObjectId} from "mongodb";

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO)

export async function getTodosPosts() {

    const db = conexao.db("imersao-alura");
    const collection = db.collection("posts");
    return collection.find().toArray();

}

export async function buscarPostPorID(id) {

    let posts = await getTodosPosts();

    return posts.findIndex(post => {
        return post.id === Number(id);
    });
}

export async function criarPost(content) {

    const db = conexao.db("imersao-alura");
    const collection = db.collection("posts");
    return collection.insertOne(content);

}

export async function atualizarPost(id, novoPost) {

    const db = conexao.db("imersao-alura");
    const collection = db.collection("posts");

    const objectId = ObjectId.createFromHexString(id);

    return collection.updateOne({
            _id: new ObjectId(objectId),
        },
        {
            $set: novoPost
        }
    );
}