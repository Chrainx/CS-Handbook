## [1.5.16](https://github.com/Chrainx/CS-Handbook/compare/v1.5.15...v1.5.16) (2026-08-03)


### Bug Fixes

* binary-search content page unreadable in dark mode ([#60](https://github.com/Chrainx/CS-Handbook/issues/60)) ([1f4a84f](https://github.com/Chrainx/CS-Handbook/commit/1f4a84ff0738e1fa82333709ac84db3842a70f13))
* replace hardcoded blue link color with the accent design token ([#62](https://github.com/Chrainx/CS-Handbook/issues/62)) ([fe9faf9](https://github.com/Chrainx/CS-Handbook/commit/fe9faf9bb03e382b7b60d05bb2d759458b2e9892)), closes [#60](https://github.com/Chrainx/CS-Handbook/issues/60)

## [1.5.15](https://github.com/Chrainx/CS-Handbook/compare/v1.5.14...v1.5.15) (2026-08-03)


### Bug Fixes

* make step-by-step state visible and legend-accurate in the visualizers ([#49](https://github.com/Chrainx/CS-Handbook/issues/49)) ([208c8a0](https://github.com/Chrainx/CS-Handbook/commit/208c8a049ea783afe1caa37fbf4e710bab74fe92))
* sidebar categories never re-collapse after client-side navigation ([#51](https://github.com/Chrainx/CS-Handbook/issues/51)) ([cde749b](https://github.com/Chrainx/CS-Handbook/commit/cde749bd70a320d5bfe4c5475ea20b7489885992))

## [1.5.14](https://github.com/Chrainx/CS-Handbook/compare/v1.5.13...v1.5.14) (2026-08-03)


### Bug Fixes

* remove ssr:false from the three algorithm visualizers ([#45](https://github.com/Chrainx/CS-Handbook/issues/45)) ([8bd1b2d](https://github.com/Chrainx/CS-Handbook/commit/8bd1b2d2da675deadf2d7b3b518cc7a7fe7b3406)), closes [#27](https://github.com/Chrainx/CS-Handbook/issues/27)
* wire up Heap Sort in the visualizer, sidebar, and legend ([#41](https://github.com/Chrainx/CS-Handbook/issues/41)) ([1b75c1d](https://github.com/Chrainx/CS-Handbook/commit/1b75c1d743b2dde48951a1ed44361515ddb7b8be)), closes [#29](https://github.com/Chrainx/CS-Handbook/issues/29)

## [1.5.13](https://github.com/Chrainx/CS-Handbook/compare/v1.5.12...v1.5.13) (2026-08-03)


### Bug Fixes

* honor edge direction consistently across graph algorithms ([#46](https://github.com/Chrainx/CS-Handbook/issues/46)) ([4d706c6](https://github.com/Chrainx/CS-Handbook/commit/4d706c6979e49cda2d59a4a5b88736ea6e2ca1df)), closes [#30](https://github.com/Chrainx/CS-Handbook/issues/30)

## [1.5.12](https://github.com/Chrainx/CS-Handbook/compare/v1.5.11...v1.5.12) (2026-08-03)


### Bug Fixes

* make the sidebar collapsible/off-canvas on small screens ([#44](https://github.com/Chrainx/CS-Handbook/issues/44)) ([302bf91](https://github.com/Chrainx/CS-Handbook/commit/302bf91544f3a3a1439c2862a5ef2f8e88f60690)), closes [#16](https://github.com/Chrainx/CS-Handbook/issues/16)
* memoize useGraphDerivedState instead of recomputing every render ([#43](https://github.com/Chrainx/CS-Handbook/issues/43)) ([6103bed](https://github.com/Chrainx/CS-Handbook/commit/6103bede758426151d2b32f39db90ed4713df239)), closes [#26](https://github.com/Chrainx/CS-Handbook/issues/26) [#23](https://github.com/Chrainx/CS-Handbook/issues/23)
* move sorting/binary-search state colors onto design tokens ([#42](https://github.com/Chrainx/CS-Handbook/issues/42)) ([4def120](https://github.com/Chrainx/CS-Handbook/commit/4def12035187a2cba7402026a363308dc0f3685f)), closes [#28](https://github.com/Chrainx/CS-Handbook/issues/28)

## [1.5.11](https://github.com/Chrainx/CS-Handbook/compare/v1.5.10...v1.5.11) (2026-08-02)


### Bug Fixes

* cap user-entered array size to prevent huge step counts ([#37](https://github.com/Chrainx/CS-Handbook/issues/37)) ([a9660cb](https://github.com/Chrainx/CS-Handbook/commit/a9660cb9fff90b032c7ab04c837e1d6a77cc782a)), closes [#23](https://github.com/Chrainx/CS-Handbook/issues/23)

## [1.5.10](https://github.com/Chrainx/CS-Handbook/compare/v1.5.9...v1.5.10) (2026-08-02)


### Bug Fixes

* move useStepPlayer's out-of-range guard into an effect ([#38](https://github.com/Chrainx/CS-Handbook/issues/38)) ([f81a63f](https://github.com/Chrainx/CS-Handbook/commit/f81a63f7a0a4f52d9f0ce16637d88b9273b18ede)), closes [#20](https://github.com/Chrainx/CS-Handbook/issues/20)

## [1.5.9](https://github.com/Chrainx/CS-Handbook/compare/v1.5.8...v1.5.9) (2026-08-02)


### Bug Fixes

* use a real not-found.tsx instead of a client-redirecting catch-all ([#40](https://github.com/Chrainx/CS-Handbook/issues/40)) ([b56f23a](https://github.com/Chrainx/CS-Handbook/commit/b56f23a3ff7343bbbf7273c92a07ed823d71b044)), closes [#31](https://github.com/Chrainx/CS-Handbook/issues/31)

## [1.5.8](https://github.com/Chrainx/CS-Handbook/compare/v1.5.7...v1.5.8) (2026-08-02)


### Bug Fixes

* auto-expand sidebar categories while searching ([#39](https://github.com/Chrainx/CS-Handbook/issues/39)) ([c76e91e](https://github.com/Chrainx/CS-Handbook/commit/c76e91e69f3fb1d9e25ceef332f1c6230f64a882)), closes [#15](https://github.com/Chrainx/CS-Handbook/issues/15)

## [1.5.7](https://github.com/Chrainx/CS-Handbook/compare/v1.5.6...v1.5.7) (2026-08-02)


### Bug Fixes

* guard against empty target input silently applying as 0 ([#36](https://github.com/Chrainx/CS-Handbook/issues/36)) ([5594eeb](https://github.com/Chrainx/CS-Handbook/commit/5594eebd38c5ed52b0825df46ec5dbfae1d1a017)), closes [#22](https://github.com/Chrainx/CS-Handbook/issues/22)

## [1.5.6](https://github.com/Chrainx/CS-Handbook/compare/v1.5.5...v1.5.6) (2026-08-02)


### Bug Fixes

* replace blocking alert() with inline validation for array input ([#35](https://github.com/Chrainx/CS-Handbook/issues/35)) ([5ee5fc2](https://github.com/Chrainx/CS-Handbook/commit/5ee5fc2b74fc70a2f365610f4151f9c2ead1e102)), closes [#21](https://github.com/Chrainx/CS-Handbook/issues/21)

## [1.5.5](https://github.com/Chrainx/CS-Handbook/compare/v1.5.4...v1.5.5) (2026-08-02)


### Bug Fixes

* add aria-expanded/aria-current to sidebar tree ([#33](https://github.com/Chrainx/CS-Handbook/issues/33)) ([8e19c4c](https://github.com/Chrainx/CS-Handbook/commit/8e19c4cf7564b62060f615a3a4855b435a1bfa38)), closes [#18](https://github.com/Chrainx/CS-Handbook/issues/18)
* allow horizontal scroll for long bar arrays instead of clipping ([#34](https://github.com/Chrainx/CS-Handbook/issues/34)) ([56fd8a3](https://github.com/Chrainx/CS-Handbook/commit/56fd8a3b96c5bfa9739e1e5b6393c071e5068d8e)), closes [#19](https://github.com/Chrainx/CS-Handbook/issues/19)

## [1.5.4](https://github.com/Chrainx/CS-Handbook/compare/v1.5.3...v1.5.4) (2026-08-02)


### Bug Fixes

* add Escape key, focus trap, and dialog semantics to Modal ([#32](https://github.com/Chrainx/CS-Handbook/issues/32)) ([7b2718d](https://github.com/Chrainx/CS-Handbook/commit/7b2718dd2f3cb0526bc98df3ec934a2913493d9e)), closes [#17](https://github.com/Chrainx/CS-Handbook/issues/17)

## [1.5.3](https://github.com/Chrainx/CS-Handbook/compare/v1.5.2...v1.5.3) (2026-08-02)


### Bug Fixes

* clear merge sort buffers when a merge completes ([#11](https://github.com/Chrainx/CS-Handbook/issues/11)) ([9b16b35](https://github.com/Chrainx/CS-Handbook/commit/9b16b3562720eacc965c16cc438c4eecc45fa0d0)), closes [#2](https://github.com/Chrainx/CS-Handbook/issues/2)
* emit set-distance step in Prim's algorithm ([#12](https://github.com/Chrainx/CS-Handbook/issues/12)) ([62da454](https://github.com/Chrainx/CS-Handbook/commit/62da45412f03534f53da79f06bc2b298057fc20d)), closes [#3](https://github.com/Chrainx/CS-Handbook/issues/3)
* prevent stale array from overwriting reset on data reload ([#10](https://github.com/Chrainx/CS-Handbook/issues/10)) ([1b157ac](https://github.com/Chrainx/CS-Handbook/commit/1b157ac8bce1317b6a73fab080f565f8fa95bffb)), closes [#1](https://github.com/Chrainx/CS-Handbook/issues/1)
* resync TargetModal input when reopened ([#13](https://github.com/Chrainx/CS-Handbook/issues/13)) ([c5ea3d0](https://github.com/Chrainx/CS-Handbook/commit/c5ea3d09910ab7e20ec3a041eccaa3a741ae7930)), closes [#4](https://github.com/Chrainx/CS-Handbook/issues/4)

## [1.5.2](https://github.com/Chrainx/CS-Handbook/compare/v1.5.1...v1.5.2) (2026-02-06)


### Bug Fixes

* wrap componenet in Suspense to satisfy useSearchParams ([45ea72c](https://github.com/Chrainx/CS-Handbook/commit/45ea72ccdb0f57dfaa19525fc06909cbb49cf385))

## [1.5.1](https://github.com/Chrainx/CS-Handbook/compare/v1.5.0...v1.5.1) (2026-02-06)


### Bug Fixes

* replace anchor tag with Next.js Link for internal navigation ([b23a22c](https://github.com/Chrainx/CS-Handbook/commit/b23a22cb97013f709f6bc9905855fb2683e14e68))

# [1.5.0](https://github.com/Chrainx/CS-Handbook/compare/v1.4.0...v1.5.0) (2026-02-06)


### Features

* always expose shortest-path output even when empty ([47d1174](https://github.com/Chrainx/CS-Handbook/commit/47d1174513161de419a3e9b273b45efa816176a1))

# [1.4.0](https://github.com/Chrainx/CS-Handbook/compare/v1.3.0...v1.4.0) (2026-02-05)


### Features

* update algortihm select modal to become scrollable ([33365c6](https://github.com/Chrainx/CS-Handbook/commit/33365c6de972f6a3a48350ef31ee82c74f5ad715))

# [1.3.0](https://github.com/Chrainx/CS-Handbook/compare/v1.2.0...v1.3.0) (2026-02-05)


### Features

* ensure package.json version updates correctly ([a59072a](https://github.com/Chrainx/CS-Handbook/commit/a59072a7648e01caa9b6f24abb28867f8a270d67))

# [1.2.0](https://github.com/Chrainx/CS-Handbook/compare/v1.1.0...v1.2.0) (2026-02-05)


### Features

* verify semantic-release commits version ([b0fb20f](https://github.com/Chrainx/CS-Handbook/commit/b0fb20f1bf4f4f3baac83194eeb0cb2efc0dc3ba))

# Changelog
