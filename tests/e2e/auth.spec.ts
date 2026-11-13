import { expect, test } from '@playwright/test';

test('unauthenticated API mutations are rejected', async ({ request }) => {
  const paths = ['/api/bridge', '/api/webhook', '/api/queue'];
  for (const path of paths) {
    const response = await request.post(path, {
      data: {
        project_id: '11111111-1111-4111-8111-111111111111',
        agent: 'browserworker',
        event_type: 'qa_complete',
        qa_score: 100,
        data: { ship_it: true, faang_passed: true },
      },
    });
    expect([401, 503], path + ' must reject unauthenticated writes').toContain(response.status());
  }
});

test('queue data cannot be read without authenticated operator', async ({ request }) => {
  const response = await request.get('/api/queue');
  expect([401, 503]).toContain(response.status());
});

test('bridge status never represents an unverified executor as operational', async ({ request }) => {
  const response = await request.get('/api/bridge');
  expect(response.ok()).toBeTruthy();
  const body = await response.json();
  expect(body.execution_verified).toBe(false);
  expect(body.apex_executor_connected).toBe(false);
  expect(body.status).toBe('unverified');
});
