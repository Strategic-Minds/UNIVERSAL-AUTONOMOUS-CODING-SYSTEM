#!/usr/bin/env python3
"""
UACS Bridge Sync Script
Tests and validates the bidirectional ChatGPT <-> Base44 bridge
Usage: python3 scripts/bridge-sync.py --url=https://uacs.vercel.app
"""
import os, json, urllib.request, urllib.error, argparse

BRIDGE_SECRET = os.environ.get("BRIDGE_SHARED_SECRET","")

def test_bridge(base_url):
    results = []
    
    # Test 1: Bridge health
    print("\n1. Testing bridge health endpoint...")
    try:
        req = urllib.request.Request(f"{base_url}/api/bridge")
        with urllib.request.urlopen(req, timeout=10) as r:
            data = json.loads(r.read())
            ok = data.get("status") == "operational"
            print(f"   {'OK' if ok else 'FAIL'} {data.get('status','?')} — {data.get('system','?')}")
            results.append(("Bridge Health", ok))
    except Exception as e:
        print(f"   FAIL {e}")
        results.append(("Bridge Health", False))
    
    # Test 2: Queue API
    print("\n2. Testing queue API...")
    try:
        req = urllib.request.Request(f"{base_url}/api/queue")
        with urllib.request.urlopen(req, timeout=10) as r:
            data = json.loads(r.read())
            ok = "projects" in data or "count" in data
            print(f"   {'OK' if ok else 'FAIL'} Projects: {data.get('count','?')}")
            results.append(("Queue API", ok))
    except Exception as e:
        print(f"   FAIL {e}")
        results.append(("Queue API", False))
    
    # Test 3: Webhook endpoint
    print("\n3. Testing webhook endpoint...")
    try:
        req = urllib.request.Request(f"{base_url}/api/webhook")
        with urllib.request.urlopen(req, timeout=10) as r:
            data = json.loads(r.read())
            ok = data.get("status") == "listening"
            print(f"   {'OK' if ok else 'FAIL'} {data.get('endpoint','?')}")
            results.append(("Webhook", ok))
    except Exception as e:
        print(f"   FAIL {e}")
        results.append(("Webhook", False))
    
    # Summary
    passed = sum(1 for _, ok in results if ok)
    print(f"\n{'='*40}")
    print(f"BRIDGE SYNC: {passed}/{len(results)} PASSING")
    for name, ok in results:
        print(f"  {'OK' if ok else 'FAIL'} {name}")
    print(f"{'='*40}")
    return passed == len(results)

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--url", default="https://universal-autonomous-coding-system-lbk9qstc4.vercel.app")
    args = parser.parse_args()
    success = test_bridge(args.url)
    exit(0 if success else 1)
