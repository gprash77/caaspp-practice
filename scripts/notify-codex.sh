#!/bin/zsh

set -euo pipefail

message="${1:-Codex finished the task.}"
subtitle="${2:-Task complete}"
sound="${3:-Glass}"
title="Codex"

escaped_message="${message//\\/\\\\}"
escaped_message="${escaped_message//\"/\\\"}"

escaped_subtitle="${subtitle//\\/\\\\}"
escaped_subtitle="${escaped_subtitle//\"/\\\"}"

escaped_sound="${sound//\\/\\\\}"
escaped_sound="${escaped_sound//\"/\\\"}"

osascript -e "display notification \"${escaped_message}\" with title \"${title}\" subtitle \"${escaped_subtitle}\" sound name \"${escaped_sound}\""
