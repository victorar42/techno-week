# Security Policy


## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x     | ✅ Yes             |

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please report it responsibly.

### How to Report

1. **DO NOT** create a public GitHub issue for security vulnerabilities.
2. Email: **security@ardops.dev**
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

### Response Timeline

- **Acknowledgment**: Within 48 hours
- **Initial assessment**: Within 1 week
- **Fix and disclosure**: Within 30 days

### Scope

This is a **demo/educational project** for Techno Week 8.0. It contains intentionally simplified implementations for demonstration purposes. The following are known limitations and NOT vulnerabilities:

- Mock data instead of a real database
- Simplified JWT validation (no key rotation, no JWK)
- No TLS termination (expected to be handled by reverse proxy)
- Rate limiting is per-instance, not distributed

### Security Measures Implemented

- ✅ JWT authentication on all API endpoints
- ✅ Account-level authorization (RBAC)
- ✅ Input validation (UUID format, amount limits)
- ✅ Rate limiting
- ✅ Security headers (Helmet)
- ✅ CORS restrictions
- ✅ Payload size limits
- ✅ Automated security pipeline (6 stages)

## Acknowledgments

We appreciate responsible disclosure and will credit reporters in our changelog (with permission).
