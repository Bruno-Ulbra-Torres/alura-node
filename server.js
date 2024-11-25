
import express from 'express';
import routes from "./src/routes/postsRoutes.js";

// const posts = [
//     {
//         id: 1,
//         descricao: "uma foto teste",
//         imagem: "https://placecats.com/millie/300/150",
//     },
//     {
//         id: 2,
//         descricao: "Uma foto de um gato adorável",
//         imagem: "https://placekitten.com/200/300"
//     },
//     {
//         id: 3,
//         descricao: "Paisagem montanhosa ao pôr do sol",
//         imagem: "https://source.unsplash.com/random/200x300/?mountain,sunset"
//     },
//     {
//         id: 4,
//         descricao: "Cachorro brincando na praia",
//         imagem: "https://source.unsplash.com/random/200x300/?dog,beach"
//     },
//     {
//         id: 5,
//         descricao: "Comida deliciosa e colorida",
//         imagem: "https://source.unsplash.com/random/200x300/?food"
//     },
//     {
//         id: 6,
//         descricao: "Cidades modernas e arquitetura impressionante",
//         imagem: "https://source.unsplash.com/random/200x300/?city"
//     }
// ];

const app= express();

app.use(express.static("uploads"));

routes(app);

app.listen(3000, () => {
    console.log('Servidor escutando');
});