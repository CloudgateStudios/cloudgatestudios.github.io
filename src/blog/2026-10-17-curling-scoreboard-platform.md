---
title: "Curling Scoreboard is now a system for clubs"
date: 2026-10-17
description: "What started as a single page for keeping score has grown into a managed platform."
---

[Curling Scoreboard](https://curlingscoreboard.app) started as one page. You opened it on whatever device was sitting by the sheet, tapped in the score as the ends went by, and that was the whole product. No accounts, no install, nothing to manage.

That version still exists, and it still works exactly that way. But over the past few months it has grown into a managed system a club can run across every sheet in the building, with leagues, bonspiels, displays in the warm room and on a stream, and a way to get the scores back out into the club's own website. We have developed this with <a href="https://windycitycurling">Windy City Curling in Villa Park, IL</a> where its up and running today.

This post is a tour of what's there now.

<figure>
  <img src="{{ "/assets/img/CurlingScoreboardGameScreenshot.png" | url }}" alt="A Curling Scoreboard game in progress, with red leading yellow 6 to 4 in the seventh end, each end's score laid out beneath the totals, and markers showing which team has the hammer." width="800" height="573">
  <figcaption>The tweaked scoreboard.</figcaption>
</figure>

## The scoreboard still works alone

Worth saying up front, because it shapes everything else: nothing about scoring depends on the backend.

An unpaired scoreboard is the original app. Open the page, start a game, keep score. If a club pairs its scoreboards and the internet goes down mid-draw, scoring carries on as if nothing happened, and the scores sync when the connection comes back. Writes are fire-and-forget by design, so a failed sync can never interrupt a game in progress.

Pairing adds syncing. It doesn't add a dependency.

## Scoreboards that belong to a club

A club has sheets, and each sheet has a scoreboard paired to it. An admin generates a six character code for a sheet in the portal, someone types it into the scoreboard once, and from then on that device is that sheet.

Once paired, the scoreboard reports on itself every half hour to ensure the basics of the system are working. The portal shows each sheet's scoreboard as online or offline, flags one running an old build as "Update pending", and surfaces the last failed sync, which is otherwise invisible because scoring never blocks on the network.

Disconnecting is deliberately hard to do by accident, because scoreboards sit in public where anyone can tap at them. The setup screen just says "Connected as club – sheet". Press and hold that for four seconds, with a ring filling in as you go, and you get a dialog with a Disconnect button that asks for the club's admin PIN before it will let go of the sheet. If something is broken on the tablet you also have the ability to disconnect a tablet from the admin panel.

Clubs that play with colors other than red and yellow pick theirs in the portal, and the paired scoreboards update. The colors are read when a game starts, so a change never lands in the middle of one, and each scoreboard remembers the last colors it saw so it still comes up right if it boots before the network does.

<figure>
  <img src="{{ "/assets/img/CurlingScoreboardAdminSheetsScreenshot.webp" | url }}" alt="The admin portal's Sheets and Games tab, showing six sheets with live games in progress, each scoreboard's version and last-seen time, and the last seven days of completed games beside them." width="1440" height="900" loading="lazy">
  <figcaption>Every sheet at once: what is live, which scoreboards are online, and what has been played this week.</figcaption>
</figure>

<figure>
  <img src="{{ "/assets/img/CurlingScoreboardRockColorsScreenshot.webp" | url }}" alt="The portal's scoreboard settings, with swatches for the first and second rock colors and a preview of how a score looks on the club's scoreboards." width="1440" height="900" loading="lazy">
  <figcaption>Clubs that do not play red and yellow pick their colors here, with a preview of the result.</figcaption>
</figure>

## Leagues, and teams that are actually named

The biggest change for a regular club night: a game can know which league it belongs to and which teams are playing.

A club admin sets up each league with its weekly draw times and its teams, either by hand or by importing a CSV with the data. The import is parsed in the browser and shows you exactly what would be added, renamed and removed before it writes anything. Teams keep a stable ID across renames and re-imports, so re-importing your roster next season doesn't orphan the games already recorded against a team.

<figure>
  <img src="{{ "/assets/img/CurlingScoreboardLeaguesScreenshot.webp" | url }}" alt="The portal's Leagues tab, with the club's seven leagues laid out on a weekly calendar from Sunday to Saturday and listed below with their team counts and draw times." width="1440" height="1683" loading="lazy">
  <figcaption>The club's week. Draw times are what a scoreboard checks its own clock against to offer the right league.</figcaption>
</figure>

On the scoreboard, this shows up as one bar above the normal setup screen. Leave it alone and you get an open game, exactly as before. The bar follows the scoreboard's own clock: if a league is in its draw window, which is configurable in the admin panel, it names that league and marks it as playing now. Tapping through opens a full screen team picker, every team one large button on a fixed grid, sized for mitts and for being read from a few feet away.

Once teams are picked, both names sit under the total scores on their rock colors, so the players can check that whoever set it up got it right. And if's wrong the Teams button re-picks them at any point until the game is finished.

The league and each team's ID ride along with the game, including the external ID from the club's own league software if the import supplied one. That's what makes the scores useful to anything downstream.

<figure>
  <img src="{{ "/assets/img/CurlingScoreboardLeagueTeamsScreenshot.webp" | url }}" alt="A league's page in the portal, showing its season dates, its two Monday draws, and its twelve teams each with a name and an external ID from the club's own league software." width="1440" height="900" loading="lazy">
  <figcaption>One league: its season, its draws, and its roster. The second column is each team's ID in the club's own league software.</figcaption>
</figure>

## Bonspiels

Bonspiels were the hard part, and the most recent.

The format changes from one bonspiel to the next, so the system doesn't store formats. A bonspiel is a list of games, and each side of each game says where its team comes from: a team the coordinator placed, the winner or loser of a game in an earlier draw, a finishing place out of a pool, or not decided yet. An A/B/C knockout, a round robin into a playoff, and games placed entirely by hand are all just different ways of writing that down.

Coordinators plan it on a draw board — draws down the side, sheets across. Tap a game to set its teams or its result, tap an empty cell to add one. Beside that, a bracket view lays out each event in rounds and names the winner once there is one. Pools show standings instead, ranked on points, then on the games between the tied teams, and then by an order the coordinator sets after a last stone draw or a tiebreak game.

You don't have to build a bracket from scratch. A knockout template fills in a whole bonspiel — up to 64 teams across as many as four events, with losers dropping down the way most club spiels run it, byes handled so no team gets two. A pools template splits teams into round robins and feeds the top finishers into a playoff. What either one produces is an ordinary plan you can then edit by hand. And Duplicate copies a bonspiel's events, draws and games onto new dates to run the whole thing again next year.

<figure>
  <img src="{{ "/assets/img/CurlingScoreboardBonspielSetupScreenshot.webp" | url }}" alt="A bonspiel's setup page, with its dates and default number of ends, its four events each with their own end count, and its twenty-four teams listed down the right." width="1440" height="900" loading="lazy">
  <figcaption>The spiel itself: dates, events and teams. Duplicate copies all of it onto next year's dates.</figcaption>
</figure>

The part that makes it work on the ice: during the bonspiel, each sheet's scoreboard offers that sheet's game in the current draw. A side that isn't known yet shows where it's coming from — "Winner of A3", "Pool A #1" — and fills in on its own as results land. The scoreboard also records who actually played, which wins over the plan, so a last minute team swap still sends the right team on to the next game.

Because a bonspiel weekend is its own job, there's a bonspiel admin role that can plan spiels and read game history and change nothing else. Hand it to the spiel coordinator and nothing else about the club is exposed.

<figure>
  <img src="{{ "/assets/img/CurlingScoreboardBonspielBoardScreenshot.webp" | url }}" alt="The bonspiel draw board, with ten draws down the side and six sheets across. Early games name their teams and scores; later ones read Winner of A1 or Loser of A3 until the result that fills them in arrives." width="1440" height="1420" loading="lazy">
  <figcaption>A three-day spiel on one board. Games that have not been played yet say where their teams are coming from.</figcaption>
</figure>

<figure>
  <img src="{{ "/assets/img/CurlingScoreboardBracketsScreenshot.webp" | url }}" alt="The bracket view, showing the A, B, C and D events each laid out in rounds, with completed games carrying their scores and the finals still waiting on the winners of earlier games." width="1440" height="2640" loading="lazy">
  <figcaption>The same spiel as brackets. Nothing marks a final: it is the one game in an event whose winner goes nowhere else.</figcaption>
</figure>

## Screens around the club

Scores are more useful on a wall than in a browser tab, so there are three screens a club can put up, and all of them read from the live games as they're entered.

The **warm room screen** shows every sheet at once on a TV. It figures out the best column layout for however many sheets you have and sizes everything from there, so it fills a 1080p screen, a 4K screen, or one turned on its side, without scrolling. Each card has the sheet, the end or Final, the league, and both teams on their rock colors with the hammer. An idle sheet dims and says "No game". A club can put its own title and logo in the title bar. There's a `full` view that shows every game end by end like the scoreboard itself, and a cycle view that alternates the two. And the mouse pointer hides after three seconds of being still, so the mouse someone left by the TV doesn't sit on top of the scores.

The **score bug** is for streams. It's a transparent page you drop into OBS as a browser source, showing the two teams, their colors, the scores, the hammer, and the end — and hiding itself entirely when the sheet is idle. It scales from half size to four times, and the line under the scores can show the sheet, the league, or nothing. There's a preview mode for setting it up, which shows a faded stand-in at the bug's real size when no game is on, so you can place it in OBS between draws instead of guessing.

The **bonspiel screen** is for a spiel weekend: the draw that's on right now as large cards with live scores, the next draw as a list, a full schedule grid, or the brackets, cycling through them if you like.

Each screen gets its own link from the portal, and the link's URL never has to change. What the screen shows is a setting on the link, so you can point a TV at a different sheet or switch a stream from the score bug to the warm room from the portal — mid-stream, if it comes to that — and the screen follows within seconds. The screens are built to be left running for weeks: everything retries, and a screen that loses its connection keeps showing the last scores it had rather than going blank.

<!--
STILL TO CAPTURE — the warm room screen on a TV
What: ideally a photo of the real screen on the wall in a club, several
sheets with games in progress. A clean browser capture works too, but the
photo sells it.
Why: the "oh, we want that" image for a club.
Suggested file: CurlingScoreboardWarmRoomScreenshot.jpg
-->

<!--
STILL TO CAPTURE — the score bug over stream video
What: the transparent score bug composited over actual ice footage in OBS,
not on a blank background.
Why: the bug on its own reads as a small graphic; over video it reads as a
broadcast. Showing the OBS source panel alongside would also make the setup
obvious.
Suggested file: CurlingScoreboardScoreBugScreenshot.png
-->

<figure>
  <img src="{{ "/assets/img/CurlingScoreboardDisplaysScreenshot.webp" | url }}" alt="The portal's Displays tab, listing four links — a livestream score bug, a bonspiel lobby screen, a lounge bar TV and a warm room TV — each with what it shows and when it was last used, beside the warm room screen's title and logo." width="1440" height="900" loading="lazy">
  <figcaption>One link per screen. What each one shows is a setting here, so a TV can be re-pointed without touching the TV.</figcaption>
</figure>

## Getting the scores out

Two ways, depending on what you're doing.

A **read-only REST API** covers the club, its sheets, live and completed games, its leagues and its bonspiels. Live games carry the ends played so far, not just the totals. League games carry team IDs — including the external ones from your league software — so a result can be matched back to a team automatically. Every request needs the club's API key. It's documented with OpenAPI at [`/api-docs/`](https://curlingscoreboard.app/api-docs/), and there's a test page in the portal for trying calls without writing any code. Club websites are expected to call it straight from the browser, so it's set up to allow that.

A **webhook** covers the other case: every finished game posted to a URL, which in practice means a Slack or Discord channel. Clubs can post every game, only league games, or only bonspiel games, and write their own message with variables — `{team1}`, `{league}`, `{date}` and so on — in their own time zone. Discord posts are sent with notifications suppressed, so results land in the channel without buzzing everyone's phone, and any `@everyone` typed into a template pings nobody. A game posts exactly once, failures are retried, and the outcome of each post shows up in the portal next to the game so you can tell a quiet channel from a broken URL.

The nice property of both: they're driven by what someone already does, which is tap in the score. Nobody has to re-enter results anywhere.

<figure>
  <img src="{{ "/assets/img/CurlingScoreboardIntegrationsScreenshot.webp" | url }}" alt="The portal's Integrations settings: an API key with a link to the API documentation, and below it the completed game webhook with its destination URL masked, what it posts, and when the last game was delivered." width="1440" height="900" loading="lazy">
  <figcaption>Both routes out, in one place. The webhook records its last delivery, so a quiet channel and a broken URL look different.</figcaption>
</figure>

<figure>
  <img src="{{ "/assets/img/CurlingScoreboardGameHistoryScreenshot.webp" | url }}" alt="A sheet's game history with one game expanded to its end-by-end line score, and a note underneath reading Webhook delivered 200." width="1440" height="900" loading="lazy">
  <figcaption>Each completed game keeps its ends, and what happened when it was posted.</figcaption>
</figure>

<!--
STILL TO CAPTURE — webhook results in Discord or Slack
What: three or four completed game results posted in a real channel, using a
club's custom message format.
Why: instantly legible, and it's the feature most likely to make a club
realize they can stop manually posting results. The settings card above
proves the feature exists; the channel shows why a club would want it.
Suggested file: CurlingScoreboardWebhookPostsScreenshot.webp
-->

## Keeping it running

A few things that aren't features so much as the reason none of this needs attention on a club night.

Scoreboards are left open for weeks, so the web app updates itself. When a new build ships, a scoreboard waits until there's no game in progress, then for two minutes of nobody touching it, then shows a fifteen second countdown and reloads. Any touch restarts the wait. It will never reload in the middle of an end.

Roles are tight. A paired scoreboard can read its own sheet and its club's settings, and write its own games — nothing else, and it loses that access the moment it's disconnected or replaced. A display screen can read the scores it displays and nothing more. The club's API key and webhook URL live where scoreboards and display screens can't reach them.

And there are two environments, with every change going through automated checks — including tests that run the real security rules against a Firebase emulator — before it reaches either one.

## Interested in this for your club?

If you run a curling club and any of the above sounds like something you'd use — scoreboards on every sheet, your leagues and your rosters in it, a warm room TV, a score bug on your stream, results posting themselves to your Discord — get in touch and we'll talk about getting your club set up.

[Email contact@cloudgatestudios.com](mailto:contact@cloudgatestudios.com), or just open [curlingscoreboard.app](https://curlingscoreboard.app) and keep score on something. That part still works without talking to anybody.
