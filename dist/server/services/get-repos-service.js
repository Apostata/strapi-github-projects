"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = require("@octokit/request");
const axios_1 = __importDefault(require("axios"));
const markdown_it_1 = __importDefault(require("markdown-it"));
const md = (0, markdown_it_1.default)();
const { GITHUB_TOKEN } = process.env;
exports.default = ({ strapi }) => ({
    getRepoProject: async (repo) => {
        var _a, _b;
        const { id } = repo;
        const projects = await ((_a = strapi.entityService) === null || _a === void 0 ? void 0 : _a.findMany("plugin::github-projects.project", {
            filters: {
                repositoryId: id,
            },
        }));
        const projectId = (projects === null || projects === void 0 ? void 0 : projects.length) > 0 ? (_b = projects === null || projects === void 0 ? void 0 : projects[0]) === null || _b === void 0 ? void 0 : _b.id : null;
        return projectId;
    },
    getPublicRepos: async () => {
        var _a;
        const result = await (0, request_1.request)("GET /user/repos", {
            headers: {
                authorization: `token ${GITHUB_TOKEN}`,
            },
            type: "public",
        });
        const repos = Promise.all((_a = result === null || result === void 0 ? void 0 : result.data) === null || _a === void 0 ? void 0 : _a.map(async (repo) => {
            var _a, _b;
            const { id, name, description, html_url, owner, default_branch } = repo;
            const readmeUrl = `https://raw.githubusercontent.com/${owner.login}/${name}/${default_branch}/README.md`;
            let longDescription;
            try {
                longDescription = (_b = md
                    .render((_a = (await axios_1.default.get(readmeUrl))) === null || _a === void 0 ? void 0 : _a.data)) === null || _b === void 0 ? void 0 : _b.replace(/\n/g, "<br />");
            }
            catch (e) {
                longDescription = description || "# without readme";
            }
            const repository = {
                id,
                name,
                shortDescription: description,
                longDescription,
                url: html_url,
            };
            const projectId = await strapi
                .plugin("github-projects")
                .service("getReposService")
                .getRepoProject(repository);
            return {
                ...repository,
                projectId,
            };
        }));
        return repos;
    },
});
