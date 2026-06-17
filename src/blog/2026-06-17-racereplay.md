---
title: "Introducing Race Replay"
date: 2026-06-17
description: "Race Replay shows you every physical pass that happened on course using per-athlete start times — so the numbers reflect what actually happened on the road, not just chip time rank."
---

Today I'm launching [Race Replay](https://racereplay.app), a new tool for endurance racing that answers a question chip time results have never been able to answer: who actually passed whom on the road?

## The problem with chip time results

Standard race results rank athletes by adjusted chip time, which accounts for wave starts and staggered gun times. That's the right way to determine the winner — but it tells you nothing about the physical experience of racing.

If you started in wave three and finished with a faster adjusted time than someone who started in wave one, you technically "beat" them in the results. But you may have never been anywhere near them on the course. You passed a completely different set of athletes, and they passed a completely different set too.

Race Replay fixes that.

## What Race Replay does

Race Replay takes the per-athlete start times and checkpoint splits from a race and calculates every physical pass that actually happened on course, leg by leg. It shows you who you were racing shoulder-to-shoulder with, who you moved past on the climb, and where you lost ground in the final miles.

The data is grounded in what happened on the road, not an artifact of start wave math.

## How it was built

This project came together quickly, and like the recent Bike Share Buddy rewrite, a significant amount of it was built using Claude Code. The approach was the same: think carefully through the plan upfront, then execute phase by phase. I could hand off a phase, step away, and come back to a diff ready to review.

The core parsing and ranking logic required some careful thought around edge cases — athletes who didn't finish a leg, timing anomalies, multi-leg races where positions flip back and forth. Getting that right was the interesting part of the build.

## Try it

[Race Replay](https://racereplay.app) is a web app — no install required. If you've raced anything with chip timing and per-leg splits, give it a try.
