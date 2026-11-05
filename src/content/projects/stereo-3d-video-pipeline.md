---
order: 1
title: "Case Study: Automated 2D-to-3D HDR Video Pipeline"
description: "How an automated pipeline converts 4K HDR video to stereo 3D on cloud GPUs, and the I/O bottleneck that took 66% of processing time."
h1: "Automated 2D-to-3D conversion for 4K HDR video"
homeTitle: "Stereo 3D video pipeline — automated 2D-to-3D for HDR footage"
lede: "An automated, GPU-accelerated pipeline that converts high-resolution HDR video into stereoscopic 3D — depth estimation, stereo frame generation and chunked processing on cloud GPUs."
tag: "Media AI · client work"
status: "XclusiveVR.com · recommended"
client: "XclusiveVR.com"
role: "AI infrastructure & backend"
period: "2025 – present"
state: "In production"
service: "computer-vision"
nodes:
  - { label: "Source video in", tech: "HDR · high resolution" }
  - { label: "Chunk & decode", tech: "FFmpeg · NVDEC" }
  - { label: "Video depth estimation", tech: "PyTorch · CUDA" }
  - { label: "Stereo frame synthesis", tech: "left / right views" }
  - { label: "GPU workers", tech: "RunPod · Blackwell GPUs · Docker" }
  - { label: "Encode & deliver", tech: "FFmpeg NVENC · Cloudflare R2" }
rows:
  - { k: "Problem", v: "Convert ordinary 2D video into stereoscopic 3D automatically, at production resolution, for HDR footage." }
  - { k: "My role", v: "AI infrastructure & backend engineer — pipeline design, GPU deployment and end-to-end automation." }
  - { k: "Approach", v: "Video depth estimation → stereo frame generation, with video processed in optimised chunks on RunPod GPUs, stored and delivered through Cloudflare R2." }
  - { k: "Stack", v: "Python · PyTorch · CUDA · FFmpeg · Docker · RunPod · Cloudflare R2 / Workers · GitHub Actions" }
  - { k: "Outcome", v: "In production at 4K HDR on Blackwell GPUs. CPU I/O bottleneck (~66% of processing time) fixed; HDR output keeps 16-bit precision. Recommended by the client on LinkedIn." }
notes:
  - { k: "HDR", t: "Keeping HDR intact", d: "HDR was detected but not passed to the stereo step, so output fell back to 8-bit. I fixed the hand-off so 16-bit precision carries through to the encoder." }
  - { k: "Throughput", t: "Removing the I/O bottleneck", d: "Profiling showed CPU I/O took about 66% of processing time. Optimised chunked processing kept the GPUs working instead of waiting on disk." }
  - { k: "Hardware", t: "Running on Blackwell GPUs", d: "The pipeline runs on RTX PRO 6000 Blackwell GPUs. Supporting them meant PyTorch nightly builds for sm_120 and fixing GPU selection logic." }
quote: true
about: ["2D-to-3D video conversion", "Monocular depth estimation", "GPU inference"]
published: "2026-11-05"
updated: "2026-11-05"
---

The client needed to turn existing 2D video into stereoscopic 3D without manual work, at the resolution and colour quality their audience expects. Manual conversion is slow and expensive; a naive script on a single GPU is too slow for long 4K files.

I designed the pipeline around three ideas: split long videos into chunks that GPUs can process independently, keep HDR colour information intact from input to output, and automate everything from upload to delivery. Client footage stays confidential, so the visuals on this page are illustrative.
