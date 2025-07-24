export default async function emailsRoutes(fastify, opts) {
    fastify.get('/api/emails', async (req, reply) => {
      const emails = await fastify.knex('emails').select('*').orderBy('created_at', 'desc');
      reply.send(emails);
    });
  
    fastify.post('/api/emails', async (req, reply) => {
      const { to, cc, bcc, subject, body } = req.body;
      const [email] = await fastify.knex('emails')
        .insert({ to, cc, bcc, subject, body, created_at: new Date().toISOString() })
        .returning('*');
      reply.send(email);
    });
  }
  