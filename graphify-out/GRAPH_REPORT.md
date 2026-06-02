# Graph Report - logi_fre  (2026-06-01)

## Corpus Check
- 97 files · ~31,669 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1311 nodes · 2174 edges · 83 communities (80 shown, 3 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `bf6ae6e1`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 27|Community 27]]
- [[_COMMUNITY_Community 28|Community 28]]
- [[_COMMUNITY_Community 29|Community 29]]
- [[_COMMUNITY_Community 30|Community 30]]
- [[_COMMUNITY_Community 31|Community 31]]
- [[_COMMUNITY_Community 32|Community 32]]
- [[_COMMUNITY_Community 33|Community 33]]
- [[_COMMUNITY_Community 34|Community 34]]
- [[_COMMUNITY_Community 35|Community 35]]
- [[_COMMUNITY_Community 36|Community 36]]
- [[_COMMUNITY_Community 37|Community 37]]
- [[_COMMUNITY_Community 38|Community 38]]
- [[_COMMUNITY_Community 39|Community 39]]
- [[_COMMUNITY_Community 40|Community 40]]
- [[_COMMUNITY_Community 41|Community 41]]
- [[_COMMUNITY_Community 42|Community 42]]
- [[_COMMUNITY_Community 43|Community 43]]
- [[_COMMUNITY_Community 44|Community 44]]
- [[_COMMUNITY_Community 45|Community 45]]
- [[_COMMUNITY_Community 46|Community 46]]
- [[_COMMUNITY_Community 47|Community 47]]
- [[_COMMUNITY_Community 48|Community 48]]
- [[_COMMUNITY_Community 49|Community 49]]
- [[_COMMUNITY_Community 50|Community 50]]
- [[_COMMUNITY_Community 51|Community 51]]
- [[_COMMUNITY_Community 52|Community 52]]
- [[_COMMUNITY_Community 53|Community 53]]
- [[_COMMUNITY_Community 54|Community 54]]
- [[_COMMUNITY_Community 55|Community 55]]
- [[_COMMUNITY_Community 56|Community 56]]
- [[_COMMUNITY_Community 57|Community 57]]
- [[_COMMUNITY_Community 58|Community 58]]
- [[_COMMUNITY_Community 59|Community 59]]
- [[_COMMUNITY_Community 60|Community 60]]
- [[_COMMUNITY_Community 61|Community 61]]
- [[_COMMUNITY_Community 62|Community 62]]
- [[_COMMUNITY_Community 63|Community 63]]
- [[_COMMUNITY_Community 64|Community 64]]
- [[_COMMUNITY_Community 65|Community 65]]
- [[_COMMUNITY_Community 66|Community 66]]
- [[_COMMUNITY_Community 67|Community 67]]
- [[_COMMUNITY_Community 68|Community 68]]
- [[_COMMUNITY_Community 69|Community 69]]
- [[_COMMUNITY_Community 70|Community 70]]
- [[_COMMUNITY_Community 71|Community 71]]
- [[_COMMUNITY_Community 72|Community 72]]
- [[_COMMUNITY_Community 73|Community 73]]
- [[_COMMUNITY_Community 74|Community 74]]
- [[_COMMUNITY_Community 75|Community 75]]
- [[_COMMUNITY_Community 76|Community 76]]
- [[_COMMUNITY_Community 77|Community 77]]
- [[_COMMUNITY_Community 78|Community 78]]
- [[_COMMUNITY_Community 79|Community 79]]
- [[_COMMUNITY_Community 80|Community 80]]
- [[_COMMUNITY_Community 81|Community 81]]
- [[_COMMUNITY_Community 82|Community 82]]

## God Nodes (most connected - your core abstractions)
1. `cn()` - 105 edges
2. `settings` - 55 edges
3. `settings` - 55 edges
4. `Card()` - 34 edges
5. `CardContent()` - 34 edges
6. `Button()` - 30 edges
7. `apiGet()` - 29 edges
8. `common` - 28 edges
9. `common` - 28 edges
10. `Badge()` - 25 edges

## Surprising Connections (you probably didn't know these)
- `AlertDialogOverlay()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/alert-dialog.tsx → src/lib/utils.ts
- `AlertDialogMedia()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/alert-dialog.tsx → src/lib/utils.ts
- `AvatarBadge()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/avatar.tsx → src/lib/utils.ts
- `AvatarGroup()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/avatar.tsx → src/lib/utils.ts
- `AvatarGroupCount()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/avatar.tsx → src/lib/utils.ts

## Communities (83 total, 3 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.06
Nodes (76): mockUsers, RoomPreset, roomPresets, SizeEstimationGuide(), SizeEstimationGuideProps, Step, Stepper(), StepperProps (+68 more)

### Community 1 - "Community 1"
Cohesion: 0.06
Nodes (40): geistMono, geistSans, metadata, getPaymentMethods(), getPayoutMethods(), getLocale(), getLocaleLabel(), Locale (+32 more)

### Community 2 - "Community 2"
Cohesion: 0.13
Nodes (15): devDependencies, eslint, eslint-config-next, jsdom, tailwindcss, @tailwindcss/postcss, @testing-library/dom, @testing-library/jest-dom (+7 more)

### Community 3 - "Community 3"
Cohesion: 0.07
Nodes (37): EditMovePage(), ContractDetailPage(), MoveDetailPage(), nextStatusMap, cancelContractReasons, Contract, contractTimelineSteps, currentTransporter (+29 more)

### Community 4 - "Community 4"
Cohesion: 0.13
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 5 - "Community 5"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 6 - "Community 6"
Cohesion: 0.11
Nodes (25): Payment, EmptyState(), EmptyStateProps, { container }, icon, activeStatuses, ContractsPage(), filters (+17 more)

### Community 7 - "Community 7"
Cohesion: 0.12
Nodes (17): dependencies, @base-ui/react, class-variance-authority, clsx, @hookform/resolvers, lucide-react, next, next-intl (+9 more)

### Community 8 - "Community 8"
Cohesion: 0.14
Nodes (14): dependencies, @base-ui/react, class-variance-authority, clsx, @hookform/resolvers, lucide-react, next, react (+6 more)

### Community 9 - "Community 9"
Cohesion: 0.04
Nodes (55): settings, accountDeleted, accountNumber, addAccount, addCard, addCardButton, addPayout, bankName (+47 more)

### Community 10 - "Community 10"
Cohesion: 0.60
Nodes (3): Deploy on Vercel, Getting Started, Learn More

### Community 14 - "Community 14"
Cohesion: 0.33
Nodes (5): circles, connectors, { container }, root, steps

### Community 15 - "Community 15"
Cohesion: 0.04
Nodes (55): settings, accountDeleted, accountNumber, addAccount, addCard, addCardButton, addPayout, bankName (+47 more)

### Community 18 - "Community 18"
Cohesion: 0.04
Nodes (47): auth, confirmPassword, email, errors, forgot, forgotPassword, hasAccount, login (+39 more)

### Community 19 - "Community 19"
Cohesion: 0.04
Nodes (47): auth, confirmPassword, email, errors, forgot, forgotPassword, hasAccount, login (+39 more)

### Community 20 - "Community 20"
Cohesion: 0.08
Nodes (23): NavHeader(), NavHeaderProps, NavLink, shipperLinks, transporterLinks, allStatuses, Dispute, mockDisputes (+15 more)

### Community 21 - "Community 21"
Cohesion: 0.06
Nodes (34): cancel, checkIn, confirmReceipt, markDelivered, markInTransit, reason, reasons, title (+26 more)

### Community 22 - "Community 22"
Cohesion: 0.07
Nodes (28): common, add, back, backup, cancel, close, confirm, create (+20 more)

### Community 23 - "Community 23"
Cohesion: 0.07
Nodes (28): common, add, back, backup, cancel, close, confirm, create (+20 more)

### Community 24 - "Community 24"
Cohesion: 0.08
Nodes (26): button, subtitle, title, compare, compareDesc, secure, secureDesc, title (+18 more)

### Community 25 - "Community 25"
Cohesion: 0.08
Nodes (26): button, subtitle, title, compare, compareDesc, secure, secureDesc, title (+18 more)

### Community 26 - "Community 26"
Cohesion: 0.09
Nodes (22): addItem, deliveryDate, deliveryTimeEnd, deliveryTimeStart, destination, dimensions, editTitle, fragile (+14 more)

### Community 27 - "Community 27"
Cohesion: 0.09
Nodes (22): addItem, deliveryDate, deliveryTimeEnd, deliveryTimeStart, destination, dimensions, editTitle, fragile (+14 more)

### Community 28 - "Community 28"
Cohesion: 0.14
Nodes (16): getOffersByMoveId(), Offer, OffersPage(), statusConfig, statusFilters, mockUseParams, DialogClose(), SelectContent() (+8 more)

### Community 29 - "Community 29"
Cohesion: 0.15
Nodes (17): cancelContract(), checkIn(), confirmDelivery(), confirmReceipt(), Contract, fetchContractById(), fetchContracts(), markInTransit() (+9 more)

### Community 30 - "Community 30"
Cohesion: 0.14
Nodes (14): fetchProfile(), login(), LoginDto, register(), RegisterDto, updateProfile(), User, updateMove() (+6 more)

### Community 31 - "Community 31"
Cohesion: 0.13
Nodes (15): dashboard, browseMoves, noUpcoming, postMove, quickActions, recentActivity, stats, title (+7 more)

### Community 32 - "Community 32"
Cohesion: 0.13
Nodes (15): nav, admin, brand, browseMoves, contracts, dashboard, myMoves, myOffers (+7 more)

### Community 33 - "Community 33"
Cohesion: 0.13
Nodes (15): nav, admin, brand, browseMoves, contracts, dashboard, myMoves, myOffers (+7 more)

### Community 34 - "Community 34"
Cohesion: 0.23
Nodes (9): StarRating(), StarRatingProps, mockTransporter, TransporterProfilePage(), getCompletedMovesCount(), getReviewRatingProfile(), getReviewsByUser(), AdminReview (+1 more)

### Community 35 - "Community 35"
Cohesion: 0.15
Nodes (13): moves, browse, create, date, distance, edit, from, items (+5 more)

### Community 36 - "Community 36"
Cohesion: 0.15
Nodes (13): moves, browse, create, date, distance, edit, from, items (+5 more)

### Community 37 - "Community 37"
Cohesion: 0.17
Nodes (12): reactivate, suspend, admin, actions, search, stats, title, users (+4 more)

### Community 38 - "Community 38"
Cohesion: 0.17
Nodes (12): status, status, status, active, cancelled, checked_in, completed, delivered (+4 more)

### Community 39 - "Community 39"
Cohesion: 0.17
Nodes (11): data, notifications, empty, emptyDesc, markAllRead, title, schedule, delivery (+3 more)

### Community 40 - "Community 40"
Cohesion: 0.17
Nodes (12): admin, search, stats, status, title, users, activeUsers, contracts (+4 more)

### Community 41 - "Community 41"
Cohesion: 0.17
Nodes (11): data, notifications, empty, emptyDesc, markAllRead, title, schedule, delivery (+3 more)

### Community 42 - "Community 42"
Cohesion: 0.24
Nodes (8): fetchNotifications(), fetchUnreadCount(), markNotificationRead(), Notification, getNotificationsForUser(), Notification, notificationTypeIcons, NotificationsPage()

### Community 43 - "Community 43"
Cohesion: 0.27
Nodes (10): Earnings, FeeInfo, fetchEarnings(), fetchFee(), fetchInvoice(), fetchPaymentHistory(), fetchPaymentMethods(), Invoice (+2 more)

### Community 44 - "Community 44"
Cohesion: 0.18
Nodes (7): currentUser, ScheduleEvent, deliveries, pickups, timeEntries, eventIcons, statusColors

### Community 45 - "Community 45"
Cohesion: 0.18
Nodes (11): offers, insurance, insuranceNo, insuranceYes, loadingHelp, message, myOffers, price (+3 more)

### Community 46 - "Community 46"
Cohesion: 0.18
Nodes (11): offers, insurance, insuranceNo, insuranceYes, loadingHelp, message, myOffers, price (+3 more)

### Community 47 - "Community 47"
Cohesion: 0.22
Nodes (9): createMove(), deleteMove(), fetchMoveById(), fetchMoves(), MoveItem, MoveRequest, deletePaymentMethod(), deleteReview() (+1 more)

### Community 48 - "Community 48"
Cohesion: 0.20
Nodes (10): notificationTypes, contract_status, counter_offer, move_reminder, offer_accepted, offer_received, offer_rejected, payment (+2 more)

### Community 49 - "Community 49"
Cohesion: 0.20
Nodes (10): sizeGuide, house, largeTruck, mediumTruck, oneBed, smallVan, studio, title (+2 more)

### Community 50 - "Community 50"
Cohesion: 0.20
Nodes (10): status, status, accepted, expired, failed, held, pending, refunded (+2 more)

### Community 51 - "Community 51"
Cohesion: 0.20
Nodes (10): dashboard, browseMoves, noUpcoming, postMove, quickActions, recentActivity, title, upcomingMoves (+2 more)

### Community 52 - "Community 52"
Cohesion: 0.20
Nodes (10): notificationTypes, contract_status, counter_offer, move_reminder, offer_accepted, offer_received, offer_rejected, payment (+2 more)

### Community 53 - "Community 53"
Cohesion: 0.20
Nodes (10): sizeGuide, house, largeTruck, mediumTruck, oneBed, smallVan, studio, title (+2 more)

### Community 54 - "Community 54"
Cohesion: 0.20
Nodes (10): status, status, accepted, expired, failed, held, pending, refunded (+2 more)

### Community 55 - "Community 55"
Cohesion: 0.31
Nodes (7): AdminPage(), LandingPage(), DashboardPage(), useT(), MyOffersPage(), MakeOfferPage(), buttonVariants

### Community 56 - "Community 56"
Cohesion: 0.22
Nodes (9): devDependencies, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, @types/node, @types/react, @types/react-dom (+1 more)

### Community 57 - "Community 57"
Cohesion: 0.22
Nodes (9): payments, amount, contract, date, history, shipper, title, transporter (+1 more)

### Community 58 - "Community 58"
Cohesion: 0.22
Nodes (9): reason, reasons, title, cancel, betterOffer, noLongerNeed, noResponse, other (+1 more)

### Community 59 - "Community 59"
Cohesion: 0.22
Nodes (9): status, status, cancelled, checked_in, completed, delivered, draft, in_transit (+1 more)

### Community 60 - "Community 60"
Cohesion: 0.22
Nodes (9): payments, amount, contract, date, history, shipper, title, transporter (+1 more)

### Community 61 - "Community 61"
Cohesion: 0.25
Nodes (7): createReview(), fetchRating(), fetchRatingProfile(), fetchReviewsByUser(), flagReview(), RatingProfile, Review

### Community 62 - "Community 62"
Cohesion: 0.32
Nodes (4): ApiError, apiFetch(), getToken(), transformIds()

### Community 63 - "Community 63"
Cohesion: 0.25
Nodes (8): sortFilter, allStatus, compare, newest, priceHigh, priceLow, rating, sortBy

### Community 64 - "Community 64"
Cohesion: 0.25
Nodes (8): contracts, agreedPrice, detail, noContracts, shipper, timeline, title, transporter

### Community 65 - "Community 65"
Cohesion: 0.25
Nodes (8): sortFilter, allStatus, compare, newest, priceHigh, priceLow, rating, sortBy

### Community 66 - "Community 66"
Cohesion: 0.29
Nodes (6): name, private, version, name, private, version

### Community 67 - "Community 67"
Cohesion: 0.29
Nodes (7): scripts, build, dev, lint, start, test, test:watch

### Community 68 - "Community 68"
Cohesion: 0.33
Nodes (6): cancelConfirm, cancelMove, noOffers, offers, republish, detail

### Community 69 - "Community 69"
Cohesion: 0.33
Nodes (6): cancel, checkIn, confirmReceipt, markDelivered, markInTransit, actions

### Community 70 - "Community 70"
Cohesion: 0.33
Nodes (6): rating, comment, rateShipper, rateTransporter, skip, submit

### Community 71 - "Community 71"
Cohesion: 0.33
Nodes (6): cancelConfirm, cancelMove, noOffers, offers, republish, detail

### Community 72 - "Community 72"
Cohesion: 0.33
Nodes (5): cancelledTabs, { container }, fastMoveEntries, headings, mikeEntries

### Community 73 - "Community 73"
Cohesion: 0.40
Nodes (5): scripts, build, dev, lint, start

### Community 74 - "Community 74"
Cohesion: 0.40
Nodes (5): accept, counter, reject, viewDetail, actions

### Community 75 - "Community 75"
Cohesion: 0.40
Nodes (5): from, send, title, yourPrice, counter

### Community 76 - "Community 76"
Cohesion: 0.40
Nodes (5): expired, expires, negotiation, sentBy, detail

### Community 77 - "Community 77"
Cohesion: 0.40
Nodes (5): accept, counter, reject, viewDetail, actions

### Community 78 - "Community 78"
Cohesion: 0.40
Nodes (5): payment, escrow, pending, refunded, released

### Community 79 - "Community 79"
Cohesion: 0.40
Nodes (5): from, send, title, yourPrice, counter

### Community 80 - "Community 80"
Cohesion: 0.40
Nodes (5): stats, activeContracts, completedMoves, pendingOffers, totalSpent

### Community 81 - "Community 81"
Cohesion: 0.40
Nodes (5): expired, expires, negotiation, sentBy, detail

### Community 82 - "Community 82"
Cohesion: 0.67
Nodes (3): reactivate, suspend, actions

## Knowledge Gaps
- **864 isolated node(s):** `config`, `css`, `baseColor`, `cssVariables`, `prefix` (+859 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `auth` connect `Community 18` to `Community 39`?**
  _High betweenness centrality (0.100) - this node is a cross-community bridge._
- **Why does `settings` connect `Community 9` to `Community 39`?**
  _High betweenness centrality (0.096) - this node is a cross-community bridge._
- **Why does `settings` connect `Community 15` to `Community 41`?**
  _High betweenness centrality (0.079) - this node is a cross-community bridge._
- **What connects `config`, `css`, `baseColor` to the rest of the system?**
  _864 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.05651072904171665 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.05587808417997097 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._