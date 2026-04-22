#!/usr/bin/env python3
"""
Backend API Testing for Praveen Bajpai Portfolio
Tests the FastAPI backend endpoints for contact form functionality.
"""

import requests
import json
import time
from datetime import datetime
from typing import Dict, Any

# Configuration
BASE_URL = "https://portfolio-angular.preview.emergentagent.com"
API_BASE = f"{BASE_URL}/api"

def test_health_check():
    """Test basic health endpoint"""
    print("🔍 Testing health check endpoint...")
    try:
        response = requests.get(f"{API_BASE}/", timeout=10)
        print(f"   Status: {response.status_code}")
        print(f"   Response: {response.json()}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get("message") == "Portfolio API up":
                print("   ✅ Health check passed")
                return True
            else:
                print("   ❌ Unexpected response message")
                return False
        else:
            print("   ❌ Health check failed")
            return False
    except Exception as e:
        print(f"   ❌ Health check error: {e}")
        return False

def test_contact_post_happy_path():
    """Test POST /api/contact with valid data"""
    print("\n🔍 Testing POST /api/contact (happy path)...")
    
    test_data = {
        "name": "QA Tester",
        "email": "qa.tester+portfolio@example.com",
        "subject": "Backend test",
        "message": "This is an automated test message from QA."
    }
    
    try:
        response = requests.post(
            f"{API_BASE}/contact",
            json=test_data,
            headers={"Content-Type": "application/json"},
            timeout=30  # Longer timeout for email sending
        )
        
        print(f"   Status: {response.status_code}")
        print(f"   Response: {response.json()}")
        
        if response.status_code == 200:
            data = response.json()
            required_fields = ["success", "id", "mailed", "message"]
            
            if all(field in data for field in required_fields):
                if data["success"] is True and data["message"] == "Message received":
                    print(f"   ✅ Contact submission successful")
                    print(f"   📧 Email sent: {data['mailed']}")
                    print(f"   🆔 Record ID: {data['id']}")
                    return data["id"], data["mailed"]
                else:
                    print("   ❌ Unexpected response values")
                    return None, False
            else:
                print("   ❌ Missing required fields in response")
                return None, False
        else:
            print("   ❌ Contact submission failed")
            return None, False
            
    except Exception as e:
        print(f"   ❌ Contact submission error: {e}")
        return None, False

def test_contact_get():
    """Test GET /api/contact to retrieve submissions"""
    print("\n🔍 Testing GET /api/contact...")
    
    try:
        response = requests.get(f"{API_BASE}/contact", timeout=10)
        print(f"   Status: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"   📊 Found {len(data)} contact messages")
            
            if len(data) > 0:
                # Check the structure of the first item
                first_item = data[0]
                required_fields = ["id", "name", "email", "subject", "message", "created_at", "mailed"]
                
                if all(field in first_item for field in required_fields):
                    print("   ✅ Contact list retrieved successfully")
                    print(f"   📝 Latest message from: {first_item['name']} ({first_item['email']})")
                    return data
                else:
                    print("   ❌ Missing required fields in contact items")
                    return None
            else:
                print("   ✅ Contact list retrieved (empty)")
                return data
        else:
            print("   ❌ Failed to retrieve contact list")
            return None
            
    except Exception as e:
        print(f"   ❌ Contact list error: {e}")
        return None

def test_contact_validation():
    """Test POST /api/contact validation errors"""
    print("\n🔍 Testing POST /api/contact validation...")
    
    test_cases = [
        {
            "name": "Missing email",
            "data": {"name": "Test User", "message": "Hello"},
            "expected_status": 422
        },
        {
            "name": "Invalid email",
            "data": {"name": "Test User", "email": "not-an-email", "message": "Hello"},
            "expected_status": 422
        },
        {
            "name": "Empty message",
            "data": {"name": "Test User", "email": "test@example.com", "message": ""},
            "expected_status": 422
        },
        {
            "name": "Empty name",
            "data": {"name": "", "email": "test@example.com", "message": "Hello"},
            "expected_status": 422
        }
    ]
    
    validation_results = []
    
    for test_case in test_cases:
        print(f"   Testing: {test_case['name']}")
        try:
            response = requests.post(
                f"{API_BASE}/contact",
                json=test_case["data"],
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            print(f"     Status: {response.status_code}")
            
            if response.status_code == test_case["expected_status"]:
                print(f"     ✅ Validation working correctly")
                validation_results.append(True)
            else:
                print(f"     ❌ Expected {test_case['expected_status']}, got {response.status_code}")
                validation_results.append(False)
                
        except Exception as e:
            print(f"     ❌ Validation test error: {e}")
            validation_results.append(False)
    
    return all(validation_results)

def test_contact_sort_order():
    """Test that GET /api/contact returns items in correct order (newest first)"""
    print("\n🔍 Testing contact message sort order...")
    
    # Send two messages with a small delay
    test_data_1 = {
        "name": "Sort Test User 1",
        "email": "sorttest1@example.com",
        "subject": "First message",
        "message": "This is the first test message for sort order."
    }
    
    test_data_2 = {
        "name": "Sort Test User 2", 
        "email": "sorttest2@example.com",
        "subject": "Second message",
        "message": "This is the second test message for sort order."
    }
    
    try:
        # Send first message
        response1 = requests.post(f"{API_BASE}/contact", json=test_data_1, timeout=15)
        if response1.status_code != 200:
            print("   ❌ Failed to send first test message")
            return False
        
        first_id = response1.json().get("id")
        
        # Wait a moment to ensure different timestamps
        time.sleep(2)
        
        # Send second message
        response2 = requests.post(f"{API_BASE}/contact", json=test_data_2, timeout=15)
        if response2.status_code != 200:
            print("   ❌ Failed to send second test message")
            return False
            
        second_id = response2.json().get("id")
        
        # Get the list and check order
        response = requests.get(f"{API_BASE}/contact", timeout=10)
        if response.status_code != 200:
            print("   ❌ Failed to retrieve contact list")
            return False
            
        messages = response.json()
        
        # Find our test messages
        first_msg_index = None
        second_msg_index = None
        
        for i, msg in enumerate(messages):
            if msg["id"] == first_id:
                first_msg_index = i
            elif msg["id"] == second_id:
                second_msg_index = i
                
        if first_msg_index is not None and second_msg_index is not None:
            if second_msg_index < first_msg_index:
                print("   ✅ Sort order correct (newest first)")
                return True
            else:
                print("   ❌ Sort order incorrect")
                return False
        else:
            print("   ❌ Could not find test messages in response")
            return False
            
    except Exception as e:
        print(f"   ❌ Sort order test error: {e}")
        return False

def check_backend_logs():
    """Check backend logs for any SMTP errors"""
    print("\n🔍 Checking backend logs for SMTP errors...")
    
    import subprocess
    
    try:
        # Check error logs
        result_err = subprocess.run(
            ["tail", "-n", "80", "/var/log/supervisor/backend.err.log"],
            capture_output=True,
            text=True,
            timeout=10
        )
        
        # Check output logs  
        result_out = subprocess.run(
            ["tail", "-n", "80", "/var/log/supervisor/backend.out.log"],
            capture_output=True,
            text=True,
            timeout=10
        )
        
        print("   📋 Recent backend error logs:")
        if result_err.stdout.strip():
            print(result_err.stdout)
        else:
            print("   (No recent error logs)")
            
        print("\n   📋 Recent backend output logs:")
        if result_out.stdout.strip():
            print(result_out.stdout)
        else:
            print("   (No recent output logs)")
            
        return result_err.stdout, result_out.stdout
        
    except Exception as e:
        print(f"   ❌ Error checking logs: {e}")
        return "", ""

def main():
    """Run all backend tests"""
    print("🚀 Starting Backend API Tests for Praveen Bajpai Portfolio")
    print("=" * 60)
    
    results = {}
    
    # Test 1: Health check
    results["health"] = test_health_check()
    
    # Test 2: Contact submission (happy path)
    contact_id, email_sent = test_contact_post_happy_path()
    results["contact_post"] = contact_id is not None
    results["email_sent"] = email_sent
    
    # Test 3: Contact list retrieval
    contact_list = test_contact_get()
    results["contact_get"] = contact_list is not None
    
    # Verify the submitted record appears in the list
    if contact_id and contact_list:
        found_record = any(msg["id"] == contact_id for msg in contact_list)
        results["record_persistence"] = found_record
        if found_record:
            print("   ✅ Submitted record found in contact list")
        else:
            print("   ❌ Submitted record NOT found in contact list")
    else:
        results["record_persistence"] = False
    
    # Test 4: Validation
    results["validation"] = test_contact_validation()
    
    # Test 5: Sort order
    results["sort_order"] = test_contact_sort_order()
    
    # Check logs if email wasn't sent
    if not email_sent:
        print("\n⚠️  Email was not sent - checking backend logs...")
        err_logs, out_logs = check_backend_logs()
    
    # Summary
    print("\n" + "=" * 60)
    print("📊 TEST SUMMARY")
    print("=" * 60)
    
    for test_name, passed in results.items():
        status = "✅ PASS" if passed else "❌ FAIL"
        print(f"{test_name.replace('_', ' ').title()}: {status}")
    
    total_tests = len(results)
    passed_tests = sum(results.values())
    
    print(f"\nOverall: {passed_tests}/{total_tests} tests passed")
    
    if passed_tests == total_tests:
        print("🎉 All tests passed!")
    else:
        print("⚠️  Some tests failed - check details above")
    
    return results

if __name__ == "__main__":
    main()