export interface HubSpotContactFields {
  firstname: string;
  lastname: string;
  email: string;
  country: string;
  service_interest: 'residential' | 'industrial' | 'company-setup' | 'other';
  budget_range: string;
}

export interface HubSpotLeadEmailFields {
  email: string;
  lead_source: 'calculator' | 'resources';
}

interface HubSpotFormPayload {
  submittedAt: number;
  fields: Array<{ name: string; value: string }>;
  context: { pageUri: string; pageName: string };
}

function buildPayload(
  fields: Record<string, string>,
  context: { pageUri: string; pageName: string }
): HubSpotFormPayload {
  return {
    submittedAt: Date.now(),
    fields: Object.entries(fields).map(([name, value]) => ({ name, value })),
    context,
  };
}

async function submitToHubSpot(formGuid: string, payload: HubSpotFormPayload): Promise<void> {
  const portalId = process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID;
  const url = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`;

  let response: Response;
  try {
    response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch (networkError) {
    throw new Error('Network request failed');
  }

  if (!response.ok) {
    let message = `HubSpot error ${response.status}`;
    try {
      const data = await response.json();
      message = data.message ?? message;
    } catch {
      // non-JSON response (e.g. Cloudflare 1015)
    }
    throw new Error(message);
  }
}

export async function submitContact(fields: HubSpotContactFields): Promise<void> {
  const formGuid = process.env.NEXT_PUBLIC_HUBSPOT_CONTACT_FORM_GUID ?? '';
  const payload = buildPayload(fields as unknown as Record<string, string>, {
    pageUri: typeof window !== 'undefined' ? window.location.href : '',
    pageName: 'Contact',
  });
  await submitToHubSpot(formGuid, payload);
}

export async function captureLeadEmail(fields: HubSpotLeadEmailFields): Promise<void> {
  const formGuid = process.env.NEXT_PUBLIC_HUBSPOT_LEAD_FORM_GUID ?? '';
  const payload = buildPayload(fields as unknown as Record<string, string>, {
    pageUri: typeof window !== 'undefined' ? window.location.href : '',
    pageName: 'Lead Magnet',
  });
  try {
    await submitToHubSpot(formGuid, payload);
  } catch {
    // Swallow — PDF download must proceed regardless (Req 6.5)
  }
}
