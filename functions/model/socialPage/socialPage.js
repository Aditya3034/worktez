/* eslint-disable linebreak-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable max-len */
// eslint-disable-next-line no-dupe-else-if

const { functions, cors, fastify, requestHandler } = require("../application/lib");
const { addPost } = require("./tark/addPost");
const { addPostComment } = require("./tark/addPostComment");
const { getPosts } = require("./tark/getPosts");
const { addReaction } = require("./tark/addReaction");


fastify.post("/addPost", (req, res) => {
    addPost(req, res);
});

fastify.post("/addPostComment", (req, res) => {
    addPostComment(req, res);
});

fastify.post("/getAllPosts", (req, res) => {
    getPosts(req, res);
});

fastify.post("/addReaction", (req, res) => {
    addReaction(req, res);
});


exports.socialPage = functions.https.onRequest((req, res) => {
    cors(req, res, () => {
        fastify.ready((err) => {
            if (err) throw err;
            requestHandler(req, res);
        });
    });
});