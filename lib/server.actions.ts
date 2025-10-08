'use server';

interface SendToN8nData {
  repositoryURL: string;
}

export async function sendToN8n(data: SendToN8nData) {
  const { repositoryURL } = data;


  console.log('Data sent to server action:', data);
  console.log('N8N_WEBHOOK_URL:', process.env.N8N_WEBHOOK_URL);
  if (!process.env.N8N_WEBHOOK_URL) {
    throw new Error('N8N_WEBHOOK_URL is not defined');
  }

  const res = await fetch(process.env.N8N_WEBHOOK_URL!, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ repositoryURL }),
    cache: 'no-store',
  });

  if (!res.ok) throw new Error('n8n request failed');
  return res.json(); 
}
