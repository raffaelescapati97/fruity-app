const ALLOWED_PATH = /\/fruit\/(all|[a-zA-Z-]+)$/;

export default async (req: Request) => {
  const url = new URL(req.url);
  const match = url.pathname.match(ALLOWED_PATH);

  if (!match) {
    return Response.json({ error: 'Endpoint non disponibile' }, { status: 404 });
  }

  try {
    const apiResponse = await fetch(`https://www.fruityvice.com/api${match[0]}`);
    const body = await apiResponse.text();
    return new Response(body, {
      status: apiResponse.status,
      headers: { 'content-type': 'application/json' },
    });
  } catch (error) {
    console.error('FruityVice request failed', error);
    return Response.json({ error: 'Servizio FruityVice non disponibile' }, { status: 502 });
  }
};
