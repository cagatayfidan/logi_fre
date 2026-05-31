# Graph Report - frontend  (2026-05-31)

## Corpus Check
- 43 files · ~11,298 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 259 nodes · 586 edges · 14 communities (11 shown, 3 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `2d3ad21f`
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

## God Nodes (most connected - your core abstractions)
1. `cn()` - 86 edges
2. `compilerOptions` - 16 edges
3. `Card()` - 15 edges
4. `CardContent()` - 15 edges
5. `buttonVariants` - 14 edges
6. `Button()` - 13 edges
7. `CardHeader()` - 12 edges
8. `CardTitle()` - 12 edges
9. `getMoveById()` - 12 edges
10. `Badge()` - 11 edges

## Surprising Connections (you probably didn't know these)
- `RolePage()` --calls--> `cn()`  [EXTRACTED]
  src/app/auth/role/page.tsx → src/lib/utils.ts
- `CardAction()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/card.tsx → src/lib/utils.ts
- `DialogOverlay()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/dialog.tsx → src/lib/utils.ts
- `SelectGroup()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/select.tsx → src/lib/utils.ts
- `SelectLabel()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/select.tsx → src/lib/utils.ts

## Import Cycles
- None detected.

## Communities (14 total, 3 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.13
Nodes (30): FormItem, presetItems, steps, LoginForm, loginSchema, ProfileForm, profileSchema, RegisterForm (+22 more)

### Community 1 - "Community 1"
Cohesion: 0.07
Nodes (35): NavHeaderProps, NavLink, shipperLinks, transporterLinks, Step, Stepper(), StepperProps, cn() (+27 more)

### Community 2 - "Community 2"
Cohesion: 0.06
Nodes (31): dependencies, @base-ui/react, class-variance-authority, clsx, @hookform/resolvers, lucide-react, next, react (+23 more)

### Community 3 - "Community 3"
Cohesion: 0.09
Nodes (23): ContractDetailPage(), MoveDetailPage(), Contract, currentTransporter, currentUser, getContractById(), getMoveById(), getOfferById() (+15 more)

### Community 4 - "Community 4"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 5 - "Community 5"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 6 - "Community 6"
Cohesion: 0.20
Nodes (14): LandingPage(), EmptyState(), EmptyStateProps, NavHeader(), DashboardPage(), statusConfig, MyOffersPage(), statusConfig (+6 more)

### Community 7 - "Community 7"
Cohesion: 0.21
Nodes (12): statusConfig, Badge(), badgeVariants, SelectContent(), SelectGroup(), SelectItem(), SelectLabel(), SelectScrollDownButton() (+4 more)

### Community 8 - "Community 8"
Cohesion: 0.24
Nodes (9): statusConfig, Dialog(), DialogContent(), DialogDescription(), DialogFooter(), DialogHeader(), DialogOverlay(), DialogTitle() (+1 more)

### Community 9 - "Community 9"
Cohesion: 0.40
Nodes (3): geistMono, geistSans, metadata

### Community 10 - "Community 10"
Cohesion: 0.50
Nodes (3): Deploy on Vercel, Getting Started, Learn More

## Knowledge Gaps
- **107 isolated node(s):** `config`, `name`, `version`, `private`, `dev` (+102 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Community 1` to `Community 0`, `Community 8`, `Community 6`, `Community 7`?**
  _High betweenness centrality (0.193) - this node is a cross-community bridge._
- **Why does `Button()` connect `Community 0` to `Community 8`, `Community 1`, `Community 6`?**
  _High betweenness centrality (0.012) - this node is a cross-community bridge._
- **Why does `buttonVariants` connect `Community 6` to `Community 0`, `Community 3`, `Community 7`?**
  _High betweenness centrality (0.012) - this node is a cross-community bridge._
- **What connects `config`, `name`, `version` to the rest of the system?**
  _107 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.12784313725490196 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.07474747474747474 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.0625 - nodes in this community are weakly interconnected._