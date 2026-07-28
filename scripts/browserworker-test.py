#!/usr/bin/env python3
"""
UACS — BrowserWorker Visual Test Script
Runs headless screenshots + validation on a deployed URL
Usage: python3 scripts/browserworker-test.py --url=https://myapp.vercel.app --routes=/dashboard,/settings
"""
import os, sys, json, urllib.request, base64, argparse, re

BW_URL = os.environ.get('BROWSERWORKER_URL', 
    'https://browserworker-j4homeh5w-strategic-minds-advisory.vercel.app')
BW_SECRET = os.environ.get('BROWSERWORKER_SECRET', '')

def screenshot(url, route='/'):
    full_url = f'{url.rstrip("/")}{route}'
    payload = json.dumps({
        'steps': [
            {'action': 'goto', 'url': full_url},
            {'action': 'wait_for_selector', 'selector': 'body', 'timeout_ms': 8000},
            {'action': 'screenshot', 'fullPage': False}
        ]
    }).encode()
    req = urllib.request.Request(f'{BW_URL}/api/run', data=payload, method='POST')
    req.add_header('Content-Type', 'application/json')
    if BW_SECRET:
        req.add_header('Authorization', f'Bearer {BW_SECRET}')
    try:
        with urllib.request.urlopen(req, timeout=60) as r:
            result = json.loads(r.read())
        shots = result.get('artifacts', {}).get('screenshots', [])
        if shots:
            b64 = re.sub(r'^data:[^;]+;base64,', '', shots[0])
            img_bytes = base64.b64decode(b64)
            fname = f'/tmp/screenshot_{route.replace("/","_")}.jpg'
            with open(fname, 'wb') as f:
                f.write(img_bytes)
            return fname, len(img_bytes)
        return None, 0
    except Exception as e:
        print(f'  ❌ {route}: {e}')
        return None, 0

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--url', required=True)
    parser.add_argument('--routes', default='/dashboard,/settings')
    args = parser.parse_args()
    
    routes = [r.strip() for r in args.routes.split(',')]
    print(f"🌐 BrowserWorker testing {args.url}")
    print(f"   Routes: {routes}\n")
    
    results = []
    for route in routes:
        print(f"  Screenshotting {route}...")
        fname, size = screenshot(args.url, route)
        if fname:
            print(f"  ✅ {route} → {fname} ({size:,} bytes)")
            results.append({'route': route, 'ok': True, 'file': fname})
        else:
            results.append({'route': route, 'ok': False})
    
    passed = sum(1 for r in results if r['ok'])
    print(f"\n{'✅' if passed == len(results) else '⚠️'} {passed}/{len(results)} routes captured")
