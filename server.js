'use strict';

require('app-module-path').addPath(__dirname);

const koa = require('koa');
// const koaBody = require('koa-bodyparser');
const koaRouter = require('koa-router');
const graphqlHTTP = require('koa-graphql');
const mongo = require('koa-mongo-db');
const mount = require('koa-mount');
const schema = require('schema');
const { buildSchema } = require('graphql');

const app = new koa();
const router = new koaRouter();
const PORT = 3000;

app.use(mongo('mongodb://localhost/ShawGraph'));

const executableSchema = buildSchema(schema);

app.use(mount('/graphql', graphqlHTTP({
	schema: executableSchema,
	graphiql: true
})));

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(PORT, function() {
	console.log(`GraphQL Server is now running on http://localhost:${PORT}/graphql`)
});