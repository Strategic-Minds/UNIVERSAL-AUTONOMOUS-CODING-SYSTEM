#!/usr/bin/env python3
"""
UACS — Universal Vercel Deploy Script
Usage: python3 scripts/vercel-deploy.py --repo=Owner/REPO --branch=main --name=my-project
"""
import os, sys, json, base64, urllib.request, time, argparse

VERCEL_TOKEN = os.environ.get('VERCEL_TOKEN', '')
GH_TOKEN = os.environ.get('GITHUB_TOKEN_2', os.environ.get('GITHUB_TOKEN', ''))
TEAM_ID = os.environ.get('VERCEL_TEAM_ID', 'team_aFdds8lsbHMwe2ip4aQdbQ3d')

def gh(path):
    req = urllib.request.Request(f'https://api.github.com{path}')
    req.add_header('Authorization', f'Bearer {GH_TOKEN}')
    req.add_header('Accept', 'application/vnd.github+json')
    with urllib.request.urlopen(req, timeout=15) as r:
        return json.loads(r.read())

def vercel_deploy(repo, branch, project_name, files=None):
    if not files:
        # Get files from GitHub
        tree = gh(f'/repos/{repo}/git/trees/{branch}?recursive=1')
        files = []
        for f in tree.get('tree', []):
            if f['type'] != 'blob': continue
            if any(s in f['path'] for s in ['node_modules', '.next', '.git']): continue
            cd = gh(f'/repos/{repo}/contents/{f["path"]}?ref={branch}')
            b64 = cd.get('content', '').replace('\n', '')
            if b64:
                try:
                    raw = base64.b64decode(b64).decode('utf-8', errors='replace')
                    files.append({'file': f['path'], 'data': raw, 'encoding': 'utf-8'})
                except: pass

    # Get commit SHA
    ref = gh(f'/repos/{repo}/git/refs/heads/{branch}')
    commit_sha = ref.get('object', {}).get('sha', '')

    body = {
        'name': project_name,
        'files': files,
        'gitMetadata': {
            'remoteUrl': f'https://github.com/{repo}',
            'commitRef': branch,
            'commitSha': commit_sha,
            'commitMessage': f'UACS deploy: {project_name}',
        }
    }

    req = urllib.request.Request(
        f'https://api.vercel.com/v13/deployments?teamId={TEAM_ID}',
        method='POST', data=json.dumps(body).encode()
    )
    req.add_header('Authorization', f'Bearer {VERCEL_TOKEN}')
    req.add_header('Content-Type', 'application/json')
    with urllib.request.urlopen(req, timeout=60) as r:
        result = json.loads(r.read())

    dep_id = result.get('id', '')
    dep_url = result.get('url', '')
    print(f"🚀 Deploy started: {dep_id}")
    print(f"🔗 https://{dep_url}")

    # Poll
    for i in range(30):
        time.sleep(10)
        req2 = urllib.request.Request(f'https://api.vercel.com/v13/deployments/{dep_id}?teamId={TEAM_ID}')
        req2.add_header('Authorization', f'Bearer {VERCEL_TOKEN}')
        with urllib.request.urlopen(req2, timeout=15) as resp:
            d = json.loads(resp.read())
        state = d.get('readyState', '?')
        print(f'  [{i+1}] {state}')
        if state in ['READY', 'ERROR', 'CANCELED']:
            final = d.get('url', '')
            print(f"\n{'✅ LIVE' if state == 'READY' else '❌ ' + state}: https://{final}")
            return f'https://{final}'
    return None

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--repo', required=True)
    parser.add_argument('--branch', default='main')
    parser.add_argument('--name', required=True)
    args = parser.parse_args()
    vercel_deploy(args.repo, args.branch, args.name)
