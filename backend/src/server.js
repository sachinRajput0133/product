const app = require('./app');
const prisma = require('./config/database');

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await prisma.$connect();
    console.log('[DB] connected');

    app.listen(PORT, () => {
      console.log(`[server] http://localhost:${PORT} (${process.env.NODE_ENV || 'development'})`);
    });
  } catch (err) {
    console.error('[server] failed to start:', err);
    process.exit(1);
  }
};

const shutdown = async (signal) => {
  console.log(`\n${signal} received, closing...`);
  await prisma.$disconnect();
  process.exit(0);
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

start();
