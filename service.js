const path = require("path");
const fs = require("fs");
const Koa = require("koa");
const serve = require("koa-static");
const Router = require("@koa/router");
const bodyParser = require("koa-bodyparser");
const { Octokit } = require("@octokit/core");
const multer = require("@koa/multer");

const app = new Koa();
const router = new Router();
const upload = multer();

router.all("/ajax", async (ctx, next) => {
  const { response, request } = ctx;
  const data = request.body;
  ctx.body = {
    url: ctx.url,
    ctx_query: ctx.query,
    ctx_querystring: ctx.querystring,
    data,
  };
});

router.all("/fetch", async (ctx, next) => {
  const { response, request } = ctx;
  const data = request.body;
  ctx.body = {
    url: ctx.url,
    ctx_query: ctx.query,
    ctx_querystring: ctx.querystring,
    data,
  };
});

const deleteRepos = (repoNames, octokit) => {
  return Promise.all(
    repoNames.map((name) => octokit.request(`DELETE /repos/${name}`))
  );
};

router.post("/deleteRepo", upload.single("file"), async (ctx, next) => {
  const reposFile = ctx.file;
  const token = ctx.request.body.token;
  const content = reposFile.buffer.toString();
  const repoNames = content.split("\n");
  const octokit = new Octokit({ auth: token });
  const res = await deleteRepos(repoNames, octokit);
  ctx.body = content;
});

app.use(serve(path.resolve(__dirname, "./public")));
app.use(bodyParser());

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);
