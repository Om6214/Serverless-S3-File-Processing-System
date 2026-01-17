# Serverless S3 File Processing System

An event-driven serverless application built using **AWS Lambda** and **Amazon S3** that processes files automatically when they are uploaded to an S3 bucket.

---

## Project Overview

This project demonstrates how AWS Lambda can be triggered by S3 object upload events to validate files and generate metadata without managing any servers.

When a file is uploaded to an S3 bucket:
- AWS Lambda is triggered automatically
- The file size is validated
- Metadata is generated for valid files
- Generated Metadata is uploaded to Metadata bucket if valid
- Processing details are logged to Amazon CloudWatch



---

## Architecture

![alt text](<Screenshot from 2026-01-17 21-43-01.png>)

---

## Tech Stack

- AWS Lambda (Node.js 24.x)
- Amazon S3
- Amazon CloudWatch
- AWS IAM

---

## Features

- Event-driven serverless architecture
- Automatic Lambda invocation on S3 file upload
- File size validation logic
- Metadata generation for valid files
- CloudWatch logging for monitoring and debugging
- Designed with IAM least-privilege principles


---

## Lambda Logic Summary

- Reads S3 event data (bucket name, object key, file size)
- Rejects files larger than 1 MB
- Generates structured metadata for valid files
- Logs validation and processing details to CloudWatch

---

## IAM & Permissions

### Resource-Based Policy
- Allows only the specified S3 upload bucket to invoke the Lambda function

### Execution Role
In a full AWS environment, the Lambda execution role would include:
- `s3:GetObject`
- `s3:DeleteObject`
- `s3:PutObject`

In this lab environment, execution role modification was restricted, so S3 write/delete actions are logged instead.

---

## How to Test

1. Upload a file **smaller than 1 MB**
   - Lambda is triggered
   - Metadata is generated and logged

2. Upload a file **larger than 1 MB**
   - Lambda is triggered
   - File is rejected (logged)

---

## Sample Log Output

![alt text](<Screenshot from 2026-01-17 22-43-08.png>)
![alt text](<Screenshot from 2026-01-17 22-48-00.png>)

## Key Learnings

- Difference between Lambda resource-based policies and execution roles
- How S3 triggers Lambda using event notifications
- Handling real-world IAM restrictions in sandbox environments
- Designing scalable, serverless workflows
- Debugging and monitoring using CloudWatch logs

---

