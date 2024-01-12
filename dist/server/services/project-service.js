"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ strapi }) => ({
    find: async (query) => {
        const projects = await strapi.entityService.findMany("plugin::github-projects.project", query);
        return projects;
    },
    findOne: async (projectId, query) => {
        const project = await strapi.entityService.findOne("plugin::github-projects.project", projectId, query);
        return project;
    },
    create: async (repo, userId) => {
        const newProject = await strapi.entityService.create("plugin::github-projects.project", {
            data: {
                repositoryId: `${repo.id}`,
                title: repo.name,
                shortDescription: repo.shortDescription,
                longDescription: repo.longDescription,
                repositoryUrl: repo.url,
                createdBy: userId,
                updatedBy: userId,
            },
        });
        return newProject;
    },
    createMany: async (repos, userId) => {
        const newProjects = await Promise.all(repos.map(async (repo) => await strapi
            .plugin("github-projects")
            .service("projectService")
            .create(repo, userId)));
        return newProjects;
    },
    delete: async (projectId) => {
        const project = await strapi.entityService.delete("plugin::github-projects.project", projectId);
        return project;
    },
    deleteMany: async (projectIds) => {
        const deletedProjects = await Promise.all((projectIds || []).map(async (projectId) => await strapi
            .plugin("github-projects")
            .service("projectService")
            .delete(projectId)));
        return deletedProjects;
    },
});
