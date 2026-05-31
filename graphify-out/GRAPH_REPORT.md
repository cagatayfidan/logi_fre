# Graph Report - logi_fre  (2026-05-31)

## Corpus Check
- 66 files · ~19,971 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 401 nodes · 959 edges · 18 communities (14 shown, 4 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `003be587`
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

## God Nodes (most connected - your core abstractions)
1. `cn()` - 103 edges
2. `Card()` - 22 edges
3. `CardContent()` - 22 edges
4. `Button()` - 21 edges
5. `CardHeader()` - 18 edges
6. `CardTitle()` - 18 edges
7. `compilerOptions` - 17 edges
8. `buttonVariants` - 15 edges
9. `getMoveById()` - 15 edges
10. `Badge()` - 14 edges

## Surprising Connections (you probably didn't know these)
- `FieldSet()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/field.tsx → src/lib/utils.ts
- `FieldLegend()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/field.tsx → src/lib/utils.ts
- `FieldContent()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/field.tsx → src/lib/utils.ts
- `FieldTitle()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/field.tsx → src/lib/utils.ts
- `FieldDescription()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/field.tsx → src/lib/utils.ts

## Communities (18 total, 4 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.10
Nodes (39): FormItem, FormPhoto, presetItems, steps, FormItem, FormPhoto, presetItems, steps (+31 more)

### Community 1 - "Community 1"
Cohesion: 0.05
Nodes (56): NavHeader(), NavHeaderProps, NavLink, shipperLinks, transporterLinks, CreateMovePage(), getUnreadNotificationCount(), cn() (+48 more)

### Community 2 - "Community 2"
Cohesion: 0.05
Nodes (42): devDependencies, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, @types/node, @types/react, @types/react-dom (+34 more)

### Community 3 - "Community 3"
Cohesion: 0.06
Nodes (52): EditMovePage(), ContractDetailPage(), MoveDetailPage(), nextStatusMap, cancelContractReasons, Contract, contractTimelineSteps, currentTransporter (+44 more)

### Community 4 - "Community 4"
Cohesion: 0.13
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 5 - "Community 5"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+11 more)

### Community 6 - "Community 6"
Cohesion: 0.10
Nodes (27): LandingPage(), EmptyState(), EmptyStateProps, { container }, icon, activeStatuses, filters, statusConfig (+19 more)

### Community 7 - "Community 7"
Cohesion: 0.12
Nodes (16): dependencies, @base-ui/react, class-variance-authority, clsx, @hookform/resolvers, lucide-react, next, next-themes (+8 more)

### Community 8 - "Community 8"
Cohesion: 0.14
Nodes (14): dependencies, @base-ui/react, class-variance-authority, clsx, @hookform/resolvers, lucide-react, next, react (+6 more)

### Community 9 - "Community 9"
Cohesion: 0.33
Nodes (4): geistMono, geistSans, metadata, Toaster()

### Community 10 - "Community 10"
Cohesion: 0.60
Nodes (3): Deploy on Vercel, Getting Started, Learn More

### Community 14 - "Community 14"
Cohesion: 0.22
Nodes (8): Step, Stepper(), StepperProps, circles, connectors, { container }, root, steps

## Knowledge Gaps
- **168 isolated node(s):** `config`, `css`, `baseColor`, `cssVariables`, `prefix` (+163 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Community 1` to `Community 0`, `Community 3`, `Community 6`, `Community 14`?**
  _High betweenness centrality (0.143) - this node is a cross-community bridge._
- **Why does `Button()` connect `Community 0` to `Community 1`, `Community 3`, `Community 6`?**
  _High betweenness centrality (0.012) - this node is a cross-community bridge._
- **Why does `dependencies` connect `Community 7` to `Community 2`?**
  _High betweenness centrality (0.012) - this node is a cross-community bridge._
- **What connects `config`, `css`, `baseColor` to the rest of the system?**
  _168 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.10116550116550116 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.05368421052631579 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.046511627906976744 - nodes in this community are weakly interconnected._