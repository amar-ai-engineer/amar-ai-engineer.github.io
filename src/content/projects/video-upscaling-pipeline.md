---
order: 3
title: "Case Study: GPU Video Upscaling Pipeline (Real-ESRGAN)"
description: "Automated GPU super-resolution for large video libraries: Real-ESRGAN on RunPod serverless endpoints, optimised FFmpeg and Cloudflare R2 storage."
h1: "GPU video upscaling pipeline for media libraries"
homeTitle: "Video upscaling pipeline — GPU super-resolution for media libraries"
lede: "Automated AI super-resolution for large media libraries: GPU inference on serverless endpoints, optimised FFmpeg workflows and cloud storage."
tag: "Media AI · client work"
status: "XclusiveVR.com · recommended"
client: "XclusiveVR.com"
role: "AI backend engineer"
period: "2025 – present"
state: "In use"
service: "computer-vision"
nodes:
  - { label: "Media library", tech: "batch input" }
  - { label: "Decode", tech: "optimised FFmpeg" }
  - { label: "Super-resolution", tech: "Real-ESRGAN · CUDA" }
  - { label: "Encode", tech: "FFmpeg" }
  - { label: "Serverless GPU endpoints", tech: "RunPod · Docker · Cloudflare R2" }
rows:
  - { k: "Problem", v: "Enhance large libraries of older video to higher resolution without a manual workflow." }
  - { k: "My role", v: "AI backend engineer — inference pipeline, FFmpeg workflows, task orchestration." }
  - { k: "Approach", v: "Real-ESRGAN super-resolution on RunPod serverless GPU endpoints, with optimised FFmpeg decode/encode and Cloudflare R2 storage." }
  - { k: "Stack", v: "Python · PyTorch · Real-ESRGAN · CUDA · FFmpeg · Docker · RunPod · Cloudflare R2 · GitHub Actions CI" }
  - { k: "Outcome", v: "Delivered and in use by the same client alongside the stereo pipeline; the client recommended the work on LinkedIn." }
notes:
  - { k: "Cost", t: "Serverless GPUs", d: "Serverless endpoints mean GPUs run only while videos are processed, instead of paying for idle machines." }
  - { k: "Quality", t: "Optimised FFmpeg", d: "Decode and encode settings were tuned so the upscaled output keeps quality without bloated files." }
  - { k: "Delivery", t: "Automated storage", d: "Inputs and results move through Cloudflare R2, with CI/CD through GitHub Actions." }
quote: true
about: ["Video super-resolution", "GPU inference", "Serverless deployment"]
published: "2026-11-05"
updated: "2026-11-05"
---

The same client needed older video upscaled to higher resolution across a large library. I built an automated pipeline so files go in, get enhanced on GPUs and come back out without anyone babysitting the process.
