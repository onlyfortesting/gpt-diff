import { PUBLIC_BASE_URL } from "$env/static/public";

export async function GET() {
  return new Response(
    `
User-agent: *
Allow: /

User-Agent: Googlebot
Allow: /*.js*
Allow: /*.css*

Sitemap: ${PUBLIC_BASE_URL}/sitemap.xml

Host: ${PUBLIC_BASE_URL}

User-agent: AhrefsBot
Allow: /
`
      .trim(),
    {
      headers: {
        'Content-Type': 'text/plain'
      }
    }
  )
}
