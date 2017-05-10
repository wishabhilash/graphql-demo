'use strict';

require('app-module-path').addPath(__dirname);

// const koaBody = require('koa-bodyparser');
const koaRouter = require('koa-router');
const graphqlHTTP = require('koa-graphql');
const mount = require('koa-mount');
const schema = require('schema');
const resolvers = require('api/resolvers');
const creds = require('creds');
const { buildSchema } = require('graphql');
var MongoClient = require('mongodb').MongoClient;

const _ = require('lodash');

const app = require('app');
const router = new koaRouter();
const PORT = 3000;

app.use(function *(next){
	let db = yield MongoClient.connect(creds.db_uri);
	this.req.db = db;
	yield next;
});

const executableSchema = buildSchema(schema);

app.use(mount('/graphql', graphqlHTTP({
	schema: executableSchema,
	graphiql: true,
	rootValue: resolvers
})));

app.use(router.routes());
app.use(router.allowedMethods());
app.listen(PORT, function() {
	console.log(`GraphQL Server is now running on http://localhost:${PORT}/graphql`)
});