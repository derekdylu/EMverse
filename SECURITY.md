# Security policy

## Supported versions

Security fixes are applied only to the latest commit on `main`. This prototype has no supported production release or hosted service.

## Reporting a vulnerability

Do not disclose a suspected vulnerability, credential, or personal record in a public issue.

Use GitHub private vulnerability reporting if it is enabled for the repository. Otherwise, contact the repository owner privately through their GitHub profile and include only the minimum information needed to coordinate a secure channel.

Please include the affected component, impact, prerequisites, and a non-destructive reproduction. Do not include real credentials, personal data, or a weaponized public proof of concept.

## Deployment responsibility

The checked-in configuration binds the API to loopback and disables moderation when no administrator token is configured. Anyone deploying the project is responsible for TLS, rate limiting, monitoring, backup and recovery, privacy disclosures, abuse handling, and secret management appropriate to that environment.
