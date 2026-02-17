# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

### Added
- Four new MCP lessons (02.09–02.12) covering fundamentals, installation, configuration, and security of Model Context Protocol servers
- Three new comic strip scenarios for MCP lessons: "The Plugin Hoarder" (MCP part 2), "The Empty Meeting Room" (MCP part 3), "The Trojan README" (MCP part 4)
- `mcp.src.md` source reference document for MCP module
- `hooks.extra.md` supplementary notes on advanced hooks events and configuration gaps
- Comic strip scenarios for hooks lessons: `komiks.hooks-part-1.md` and `komiks.hooks-advanced-security.md`
- `komiks.md` command now auto-saves generated scenarios to a `komiks.[lesson-name].md` file

### Changed
- `agenda.v2.md`: marked Slash Commands, Subagents, and Hooks modules as done; updated status date and lesson range to 10–15
- `index.md`: added full topic coverage table for Lesson 15 (Bash deep-dive) and expanded security/sandbox/MCP cross-references in summary tables
- `my.06.hooks-part-1.md` and `my.07.hooks-advanced-security.md`: content updates to published hooks lessons

### Removed
- Old numbered lesson files (`01-read-write.md` through `06-orchestration.md`) replaced by new `my.*` naming scheme
- Stale template and report files: `hooks.template.md`, `subagents.template.md`, `subagents.template.v2.md`, `raport-subagents-part-1.md`, `raport-subagents-advanced.md`
- Deleted `my.04.subagents-part-1.md` through `my.07.hooks-advanced-security.md` from index (superseded by checkmarked copies)
- Removed obsolete `.claude/commands/check2.md.old`
