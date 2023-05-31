import { Database } from "./database.js";
import { buildRoutePath } from "./utils/build-route-path.js";
import { randomUUID } from "node:crypto";

const database = new Database();
export const routes = [
	{
		method: "GET",
		path: buildRoutePath("/users"),
		handler: (req, res) => {
			const { search } = req.query;
			const searchObj = search ? { nome: search, email: search } : null;
			const users = database.select("users", searchObj);
			return res.end(JSON.stringify(users));
		},
	},
	{
		method: "POST",
		path: buildRoutePath("/users"),
		handler: (req, res) => {
			const user = {
				id: randomUUID(),
				...req.body,
			};
			database.insert("users", user);

			return res.writeHead(201).end();
		},
	},
	{
		method: "PUT",
		path: buildRoutePath("/users/:id"),
		handler: (req, res) => {
			const { id } = req.params;
			const { nome, email } = req.body;
			database.update("users", id, { nome, email });
			res.writeHead(204).end();
		},
	},
	{
		method: "DELETE",
		path: buildRoutePath("/users/:id"),
		handler: (req, res) => {
			database.delete("users", req.params.id);
			return res.writeHead(204).end();
		},
	},
];
