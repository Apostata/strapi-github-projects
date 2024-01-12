"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Role Based Access Control actions
const RBAC_ACTIONS = [
    {
        section: "plugins",
        displayName: "Access the GitHub Projects plugin",
        uid: "access",
        pluginName: "github-projects",
    },
    {
        section: "plugins",
        subCategory: "Repositories",
        displayName: "Read github Repositories",
        uid: "repos.read",
        pluginName: "github-projects",
    },
    {
        section: "plugins",
        subCategory: "Projects",
        displayName: "Read Projects Entity",
        uid: "projects.read",
        pluginName: "github-projects",
    },
    {
        section: "plugins",
        subCategory: "Projects",
        displayName: "Create Projects Entity",
        uid: "projects.create",
        pluginName: "github-projects",
    },
    {
        section: "plugins",
        subCategory: "Projects",
        displayName: "Delete Projects Entity",
        uid: "projects.delete",
        pluginName: "github-projects",
    },
];
exports.default = async ({ strapi }) => {
    var _a;
    // bootstrap phase
    await ((_a = strapi.admin) === null || _a === void 0 ? void 0 : _a.services.permission.actionProvider.registerMany(RBAC_ACTIONS));
};
