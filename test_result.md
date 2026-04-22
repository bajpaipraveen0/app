#====================================================================================================
# START - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================

# THIS SECTION CONTAINS CRITICAL TESTING INSTRUCTIONS FOR BOTH AGENTS
# BOTH MAIN_AGENT AND TESTING_AGENT MUST PRESERVE THIS ENTIRE BLOCK

# Communication Protocol:
# If the `testing_agent` is available, main agent should delegate all testing tasks to it.
#
# You have access to a file called `test_result.md`. This file contains the complete testing state
# and history, and is the primary means of communication between main and the testing agent.
#
# Main and testing agents must follow this exact format to maintain testing data. 
# The testing data must be entered in yaml format Below is the data structure:
# 
## user_problem_statement: {problem_statement}
## backend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.py"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## frontend:
##   - task: "Task name"
##     implemented: true
##     working: true  # or false or "NA"
##     file: "file_path.js"
##     stuck_count: 0
##     priority: "high"  # or "medium" or "low"
##     needs_retesting: false
##     status_history:
##         -working: true  # or false or "NA"
##         -agent: "main"  # or "testing" or "user"
##         -comment: "Detailed comment about status"
##
## metadata:
##   created_by: "main_agent"
##   version: "1.0"
##   test_sequence: 0
##   run_ui: false
##
## test_plan:
##   current_focus:
##     - "Task name 1"
##     - "Task name 2"
##   stuck_tasks:
##     - "Task name with persistent issues"
##   test_all: false
##   test_priority: "high_first"  # or "sequential" or "stuck_first"
##
## agent_communication:
##     -agent: "main"  # or "testing" or "user"
##     -message: "Communication message between agents"

# Protocol Guidelines for Main agent
#
# 1. Update Test Result File Before Testing:
#    - Main agent must always update the `test_result.md` file before calling the testing agent
#    - Add implementation details to the status_history
#    - Set `needs_retesting` to true for tasks that need testing
#    - Update the `test_plan` section to guide testing priorities
#    - Add a message to `agent_communication` explaining what you've done
#
# 2. Incorporate User Feedback:
#    - When a user provides feedback that something is or isn't working, add this information to the relevant task's status_history
#    - Update the working status based on user feedback
#    - If a user reports an issue with a task that was marked as working, increment the stuck_count
#    - Whenever user reports issue in the app, if we have testing agent and task_result.md file so find the appropriate task for that and append in status_history of that task to contain the user concern and problem as well 
#
# 3. Track Stuck Tasks:
#    - Monitor which tasks have high stuck_count values or where you are fixing same issue again and again, analyze that when you read task_result.md
#    - For persistent issues, use websearch tool to find solutions
#    - Pay special attention to tasks in the stuck_tasks list
#    - When you fix an issue with a stuck task, don't reset the stuck_count until the testing agent confirms it's working
#
# 4. Provide Context to Testing Agent:
#    - When calling the testing agent, provide clear instructions about:
#      - Which tasks need testing (reference the test_plan)
#      - Any authentication details or configuration needed
#      - Specific test scenarios to focus on
#      - Any known issues or edge cases to verify
#
# 5. Call the testing agent with specific instructions referring to test_result.md
#
# IMPORTANT: Main agent must ALWAYS update test_result.md BEFORE calling the testing agent, as it relies on this file to understand what to test next.

#====================================================================================================
# END - Testing Protocol - DO NOT EDIT OR REMOVE THIS SECTION
#====================================================================================================



#====================================================================================================
# Testing Data - Main Agent and testing sub agent both should log testing data below this section
#====================================================================================================

user_problem_statement: |
  Portfolio website for Praveen Bajpai (Senior Frontend Engineer, Angular specialist).
  Contact form must: (1) persist messages in MongoDB, (2) send an email notification
  to bajpaipraveen0@gmail.com via Gmail SMTP using a configured App Password.

backend:
  - task: "POST /api/contact — save submission to MongoDB and send email via Gmail SMTP"
    implemented: true
    working: false
    file: "/app/backend/server.py"
    stuck_count: 1
    priority: "high"
    needs_retesting: false
    status_history:
        - working: "NA"
          agent: "main"
          comment: |
            Implemented POST /api/contact using pydantic EmailStr validation.
            Persists a document to db.contact_messages, then attempts SMTP send
            via smtplib on smtp.gmail.com:587 with STARTTLS using GMAIL_USER /
            GMAIL_APP_PASSWORD env vars. Returns { success, id, mailed }.
            Even if SMTP fails, the message is saved and mailed is updated to
            True on success.
        - working: false
          agent: "testing"
          comment: |
            CRITICAL: Gmail SMTP authentication failing with error 535-5.7.8 "Username and Password not accepted".
            Contact submission works (saves to MongoDB, returns 200 with success=true), but mailed=false.
            Backend logs show: SMTPAuthenticationError: (535, b'5.7.8 Username and Password not accepted. For more information, go to 5.7.8 https://support.google.com/mail/?p=BadCredentials')
            Root cause: Gmail App Password "Ifxtkzuxkybppkxm" is invalid/expired, or 2FA not properly configured on bajpaipraveen0@gmail.com.
            Solution needed: Generate new Gmail App Password with 2FA enabled.

  - task: "GET /api/contact — list last 100 submissions"
    implemented: true
    working: true
    file: "/app/backend/server.py"
    stuck_count: 0
    priority: "medium"
    needs_retesting: false
    status_history:
        - working: "NA"
          agent: "main"
          comment: "Returns last 100 contact messages sorted desc by created_at."
        - working: true
          agent: "testing"
          comment: |
            ✅ GET /api/contact working correctly. Returns JSON array with proper fields:
            id, name, email, subject, message, created_at, mailed. Sort order confirmed
            (newest first). Tested with multiple submissions.

  - task: "Validation: reject invalid email, empty name/message"
    implemented: true
    working: true
    file: "/app/backend/server.py"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        - working: "NA"
          agent: "main"
          comment: "EmailStr + min_length validators; should return 422 on invalid input."
        - working: true
          agent: "testing"
          comment: |
            ✅ All validation tests passed with HTTP 422 responses:
            - Missing email field
            - Invalid email format (not-an-email)
            - Empty message field
            - Empty name field
            Pydantic EmailStr and min_length validators working correctly.

frontend:
  - task: "Contact form wired to POST /api/contact"
    implemented: true
    working: "NA"
    file: "/app/frontend/src/components/Contact.jsx"
    stuck_count: 0
    priority: "high"
    needs_retesting: false
    status_history:
        - working: "NA"
          agent: "main"
          comment: "Replaced localStorage mock with axios call. Uses REACT_APP_BACKEND_URL."

metadata:
  created_by: "main_agent"
  version: "1.0"
  test_sequence: 1
  run_ui: false

test_plan:
  current_focus:
    - "POST /api/contact — save submission to MongoDB and send email via Gmail SMTP"
  stuck_tasks:
    - "POST /api/contact — save submission to MongoDB and send email via Gmail SMTP"
  test_all: false
  test_priority: "high_first"

agent_communication:
    - agent: "main"
      message: |
        Please test the three backend tasks listed under test_plan.current_focus.
        - Use REACT_APP_BACKEND_URL (external) for requests.
        - All endpoints are prefixed with /api.
        - For the email-send test: verify the endpoint returns 200 with
          success=true. The `mailed` flag should be true when Gmail SMTP
          succeeds. If it comes back false, capture and return the backend
          logs (tail /var/log/supervisor/backend.*.log) so I can diagnose.
        - Validation test: send invalid email and empty message, expect 422.
        - GET /api/contact should return the previously inserted record(s).
    - agent: "testing"
      message: |
        Backend testing completed. CRITICAL ISSUE FOUND:
        
        ✅ WORKING: Contact form submission, data persistence, validation, and retrieval
        ❌ FAILING: Gmail SMTP email sending (authentication error)
        
        The Gmail App Password "Ifxtkzuxkybppkxm" is being rejected by Gmail with error 535-5.7.8.
        This typically means:
        1. App password is invalid/expired
        2. 2FA not properly enabled on bajpaipraveen0@gmail.com
        3. App password was revoked
        
        IMMEDIATE ACTION REQUIRED: Generate new Gmail App Password with 2FA enabled.
        All other backend functionality is working correctly.
