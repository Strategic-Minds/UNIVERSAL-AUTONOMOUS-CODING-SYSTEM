#!/usr/bin/env python3
"""
UACS — Universal GitHub Push Script
Usage: python3 scripts/push-to-github.py --repo=Owner/REPO --branch=main --dir=./app
"""
import os, sys, json, base64, urllib.request, urllib.error, argparse
from pathlib import Path

GH = os.environ.get('GITHUB_TOKEN_2', os.environ.get('GITHUB_TOKEN', ''))

def gh(path, method='GET', body=None):
    req = urllib.request.Request(f'https://api.github.com{path}',
        method=method, data=json.dumps(body).encode() if body else None)
    req.add_header('Authorization', f'Bearer {GH}')
    req.add_header('Accept', 'application/vnd.github+json')
    req.add_header('Content-Type', 'application/json')
    try:
        with urllib.request.urlopen(req, timeout=20) as r:
            return json.loads(r.read()), r.status
    except urllib.error.HTTPError as e:
        return {'error': e.read().decode()[:200]}, e.code

def push_file(repo, path, content_bytes, branch='main', msg=None):
    r, s = gh(f'/repos/{repo}/contents/{path}?ref={branch}')
    sha = r.get('sha', '') if s == 200 else ''
    body = {
        'message': msg or f'feat(uacs): {path}',
        'content': base64.b64encode(content_bytes).decode(),
        'branch': branch,
    }
    if sha: body['sha'] = sha
    r2, s2 = gh(f'/repos/{repo}/contents/{path}', 'PUT', body)
    return s2 in [200, 201], s2

def push_directory(repo, local_dir, branch='main', prefix=''):
    local_path = Path(local_dir)
    results = []
    for file_path in sorted(local_path.rglob('*')):
        if file_path.is_file() and '.git' not in str(file_path) and 'node_modules' not in str(file_path):
            rel_path = str(file_path.relative_to(local_path))
            repo_path = f'{prefix}/{rel_path}' if prefix else rel_path
            with open(file_path, 'rb') as f:
                content = f.read()
            ok, status = push_file(repo, repo_path, content, branch)
            icon = '✅' if ok else '❌'
            print(f'  {icon} {repo_path} (HTTP {status})')
            results.append({'path': repo_path, 'ok': ok, 'status': status})
    return results

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--repo', required=True)
    parser.add_argument('--branch', default='main')
    parser.add_argument('--dir', default='.')
    parser.add_argument('--prefix', default='')
    args = parser.parse_args()
    
    print(f"📤 Pushing {args.dir} → {args.repo}@{args.branch}")
    results = push_directory(args.repo, args.dir, args.branch, args.prefix)
    ok_count = sum(1 for r in results if r['ok'])
    print(f"\n{'✅' if ok_count == len(results) else '⚠️'} {ok_count}/{len(results)} files pushed")
