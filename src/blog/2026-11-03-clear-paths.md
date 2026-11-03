---
title: "Introducing Clear Paths"
date: 2026-11-03
description: "An endless, no-guess Minesweeper built to feel at home on every Apple device, and to keep your worlds in sync between them."
---

[Clear Paths](/ClearPaths/) started the way a lot of side projects do: I wanted something that didn't exist.

I'd been playing infinite Minesweeper games to pass the time for a while. The idea is great. The board never ends, so there's always a little more to clear whenever you have a few minutes. But every one I tried was clearly built on a game engine first and shipped to iOS second. They didn't look or feel like they belonged on an iPhone, nothing carried over to my iPad, and there was no real sense that anyone cared about the Apple ecosystem at all.

So the goal was simple to say: one app, on all of the Apple platforms, that syncs without you thinking about it and looks good on every one of them.

<figure>
  <img src="{{ "/assets/img/ClearPathsIPhoneScreenshot.webp" | url }}" alt="Clear Paths on iPhone, showing the Moonpath world in the green Meadow theme, with numbered tiles, orange flags and a star marking a cleared zone." width="560" height="1217" loading="lazy">
  <figcaption>A star marks every zone you clear without hitting a mine.</figcaption>
</figure>

## The game

If you've played Minesweeper, you already know how to play. Tap to reveal a tile, hold to plant a flag, and double-tap a number once its flags are all placed to open up everything around it.

What's different is the board. A world grows one zone at a time, in every direction, for as long as you want to keep going. Every zone is checked before you play it, so the next safe move can always be worked out from the clues. No coin flips at the end of a board where you just have to guess and hope.

Hitting a mine doesn't end anything either. That one zone locks, you carry on next door, and it reopens once you clear a zone beside it. Come back tomorrow, or next week, and the world is right where you left it.

<figure>
  <img src="{{ "/assets/img/ClearPathsIPhoneJourneysScreenshot.webp" | url }}" alt="Clear Paths on iPhone with the Journeys panel open, proposing a seven-zone route to a destination called The Mossy Arch, with a map of the path, Type and Difficulty options, and a Begin button." width="560" height="1217" loading="lazy">
  <figcaption>Every destination comes with its own name and a short story.</figcaption>
</figure>

On top of that there's just enough to give you a reason to keep coming back:

- **Journeys** pick a destination with its own name and a little story, plot a route into new ground, and finish when you've cleared every zone along the way.
- **Milestones** keep quiet notes as you go, like zones cleared and new stretches of the world reached. No streaks, no leaderboards, nothing urging you on.
- **Four difficulties**, optional stone walls, and five themes, or make your own palette from a single color.

That's the balance I was going for. Easy to pick up for a couple of minutes and make some progress, and something you keep returning to just to see how much more of the board you can fill out.

<figure>
  <img src="{{ "/assets/img/ClearPathsIPhoneColorsScreenshot.webp" | url }}" alt="Clear Paths on iPhone in dark mode with the purple Dusk theme, showing the Foxglovepath world." width="560" height="1217" loading="lazy">
  <figcaption>The Dusk theme in dark mode, out on the Foxglovepath world.</figcaption>
</figure>

## The hard part was everywhere else

Building the game itself was honestly the easy part. The work that took the longest was making it look and feel right on every device it runs on, and there are more of those than you'd think:

- **iPhone**, in portrait and landscape, from the smallest screens up to the biggest.
- **iPhone Duo**, which is really two devices in one: a narrow cover screen when it's closed, and a much wider one when you open it up.
- **iPad**, both as a tablet in your hands and with a keyboard attached, where it's running in a resizable window with controls in the corner.
- **Mac**, where the iPad app runs on Apple silicon and needs to behave like it belongs there, menus included.

Each one has its own way of breaking a layout. A header that fits perfectly on an iPhone gets its tagline squeezed and cut off on a short, wide window. A world card that looks great in portrait ends up with a big empty gap in the middle when it's stretched sideways. On the Duo, the status bar sits down the side instead of across the top, which pushed the board's controls off-center from the board itself.

The easy fix is to shrink everything until it fits, but that just makes the app worse everywhere. So instead the layouts are based on how much room there actually is, not on which device it is. Cards stack the map above the stats when space is narrow and put them side by side when it's wide. The header moves the tagline down a row when it won't fit. Controls line up with the board when the safe area is lopsided. Then every one of those changes gets checked on the standard iPhones too, so fixing one screen doesn't quietly break another.

<figure>
  <img src="{{ "/assets/img/ClearPathsDuoClosedScreenshot.webp" | url }}" alt="Clear Paths on the iPhone Duo's cover screen, zoomed in on the board with flags planted and numbers showing the next safe move." width="560" height="815" loading="lazy">
  <figcaption>Closed, the Duo gets a board sized for one hand.</figcaption>
</figure>

<figure>
  <img src="{{ "/assets/img/ClearPathsDuoOpenScreenshot.webp" | url }}" alt="Clear Paths on the unfolded iPhone Duo, zoomed out on the Larkpath world, showing hundreds of cleared zones marked with stars and checks." width="800" height="1138" loading="lazy">
  <figcaption>Open, there's room to see how far you've come.</figcaption>
</figure>

## It just syncs

The other half of the goal was that your worlds should follow you. Start a world on your iPhone on the train, pick it back up on your iPad on the couch, and keep going on your Mac at your desk.

Clear Paths does that with CloudKit, Apple's own sync service, which works automatically with the iCloud account you're already signed in to. There's no account to make and no sign-in screen. Your worlds, settings, themes and milestones are kept in your private iCloud database, and they show up on your other devices on their own. If you're not signed in to iCloud, everything still works and stays on the device.

Getting that right for a board that never ends took more care than I expected. Every zone syncs on its own, so two devices can each be working on the same world, and a zone you've cleared always wins over one that isn't, because nothing ever un-clears a zone. When you open the app after some time away it'll tell you it's syncing while it catches up, rather than showing you an old view of your world.

## Try it early

Clear Paths is coming soon to the App Store for iPhone and iPad, and it'll run on Apple silicon Macs too. If you don't want to wait, there's a public TestFlight you can join today to get the app early: [join the Clear Paths beta](https://testflight.apple.com/join/Ay4GpAuc).

There are no ads, no analytics, and no tracking. Just a quiet, endless board and as much time as you want to spend on it.
