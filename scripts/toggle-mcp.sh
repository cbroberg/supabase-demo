#!/bin/bash

# MCP Server Toggle Script for Claude Code
# Usage: ./scripts/toggle-mcp.sh <suite-or-server-name> [on|off|toggle]
# Examples:
#   ./scripts/toggle-mcp.sh database-suite on      # Enable entire suite
#   ./scripts/toggle-mcp.sh postgres off           # Disable single server
#   ./scripts/toggle-mcp.sh research-suite toggle  # Toggle suite

TARGET=$1
ACTION=${2:-toggle}
CONFIG_FILE=".mcp.json"
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CONFIG_PATH="$PROJECT_ROOT/$CONFIG_FILE"

# Color output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Helper function to print usage
print_usage() {
  echo -e "${BLUE}MCP Server Toggle for Claude Code${NC}"
  echo ""
  echo "Usage: $0 <suite-or-server> [on|off|toggle]"
  echo ""
  echo "Examples:"
  echo "  $0 database-suite on       # Enable all database servers"
  echo "  $0 postgres off            # Disable single server"
  echo "  $0 frontend-suite toggle   # Toggle frontend suite"
  echo ""
  echo "Available suites:"
  if [ -f "$CONFIG_PATH" ]; then
    jq -r '.suites | keys[]' "$CONFIG_PATH" 2>/dev/null | sed 's/^/  - /'
    echo ""
    echo "Available servers:"
    jq -r '.mcpServers | keys[]' "$CONFIG_PATH" 2>/dev/null | sed 's/^/  - /'
  else
    echo -e "${RED}  Error: $CONFIG_FILE not found${NC}"
  fi
}

# Check if config file exists
if [ ! -f "$CONFIG_PATH" ]; then
  echo -e "${RED}✗ Error: $CONFIG_FILE not found at $CONFIG_PATH${NC}"
  echo ""
  print_usage
  exit 1
fi

# Show usage if no target provided
if [ -z "$TARGET" ]; then
  print_usage
  exit 1
fi

# Determine if target is a suite or server
IS_SUITE=$(jq -e ".suites[\"$TARGET\"]" "$CONFIG_PATH" > /dev/null 2>&1 && echo "true" || echo "false")
IS_SERVER=$(jq -e ".mcpServers[\"$TARGET\"]" "$CONFIG_PATH" > /dev/null 2>&1 && echo "true" || echo "false")

if [ "$IS_SUITE" = "false" ] && [ "$IS_SERVER" = "false" ]; then
  echo -e "${RED}✗ Error: '$TARGET' is neither a suite nor a server${NC}"
  echo ""
  print_usage
  exit 1
fi

# Determine which servers to toggle
if [ "$IS_SUITE" = "true" ]; then
  SERVERS=$(jq -r ".suites[\"$TARGET\"][]" "$CONFIG_PATH")
  LABEL="suite: ${YELLOW}$TARGET${BLUE}"
else
  SERVERS=$TARGET
  LABEL="server: ${YELLOW}$TARGET${BLUE}"
fi

# Process toggle
echo -e "${BLUE}Toggling MCP $LABEL${NC}"
echo ""

TEMP_FILE=$(mktemp)
cp "$CONFIG_PATH" "$TEMP_FILE"

for SERVER in $SERVERS; do
  # Check if server exists in config
  if ! jq -e ".mcpServers[\"$SERVER\"]" "$TEMP_FILE" &>/dev/null; then
    echo -e "${YELLOW}⚠ Skipped: Server '$SERVER' not found in config${NC}"
    continue
  fi

  if [ "$ACTION" = "on" ]; then
    jq ".mcpServers[\"$SERVER\"].enabled = true" "$TEMP_FILE" > "$TEMP_FILE.tmp" && mv "$TEMP_FILE.tmp" "$TEMP_FILE"
    echo -e "${GREEN}✓ Enabled:${NC}  $SERVER"
  elif [ "$ACTION" = "off" ]; then
    jq ".mcpServers[\"$SERVER\"].enabled = false" "$TEMP_FILE" > "$TEMP_FILE.tmp" && mv "$TEMP_FILE.tmp" "$TEMP_FILE"
    echo -e "${RED}✗ Disabled:${NC} $SERVER"
  else
    # Toggle action
    CURRENT=$(jq ".mcpServers[\"$SERVER\"].enabled" "$TEMP_FILE")
    NEW_VALUE=$([[ $CURRENT == true ]] && echo false || echo true)
    jq ".mcpServers[\"$SERVER\"].enabled = $NEW_VALUE" "$TEMP_FILE" > "$TEMP_FILE.tmp" && mv "$TEMP_FILE.tmp" "$TEMP_FILE"
    STATUS=$([[ $NEW_VALUE == true ]] && echo "enabled" || echo "disabled")
    echo -e "${YELLOW}⊙ Toggled:${NC}   $SERVER ($STATUS)"
  fi
done

# Replace original config with updated temp file
mv "$TEMP_FILE" "$CONFIG_PATH"

echo ""
echo -e "${GREEN}✓ Success!${NC} Updated: $CONFIG_FILE"
echo ""

if [ "$IS_SUITE" = "true" ]; then
  echo "Enabled servers in suite '$TARGET':"
  jq -r ".suites[\"$TARGET\"][] as \$server | if .mcpServers[\$server].enabled then \"  ✓ \" + \$server else \"  ✗ \" + \$server end" "$CONFIG_PATH"
else
  STATUS=$(jq ".mcpServers[\"$TARGET\"].enabled" "$CONFIG_PATH")
  echo "Server '$TARGET': $([ "$STATUS" = "true" ] && echo -e "${GREEN}✓ Enabled${NC}" || echo -e "${RED}✗ Disabled${NC}")"
fi
