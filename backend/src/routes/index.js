import aiDraft from './ai-draft.js';
import emailsRoute from './emails.js';
import knex from '../db/index.js';

export default async function routes(fastify, options) {
  fastify.get('/ping', async (request, reply) => {
    return 'pong\n';
  });

  fastify.decorate('knex', knex);
  await emailsRoute(fastify, options);
  await aiDraft(fastify, options);
}
