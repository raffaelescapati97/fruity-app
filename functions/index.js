const { onRequest } = require('firebase-functions/v2/https');

exports.fruitApi = onRequest({ cors: true, region: 'us-central1' }, async (request, response) => {
  const requestedPath = request.path.replace(/^\/api/, '');
  const isAllowedPath = /^\/fruit\/(all|[a-zA-Z-]+)$/.test(requestedPath);

  if (!isAllowedPath) {
    response.status(404).json({ error: 'Endpoint non disponibile' });
    return;
  }

  try {
    const apiResponse = await fetch(`https://www.fruityvice.com/api${requestedPath}`);
    const body = await apiResponse.text();
    response.status(apiResponse.status).type('application/json').send(body);
  } catch (error) {
    console.error('FruityVice request failed', error);
    response.status(502).json({ error: 'Servizio FruityVice non disponibile' });
  }
});