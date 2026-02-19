#!/usr/bin/env node

/**
 * MCP Server Toggle Script for Claude Code
 *
 * Usage:
 *   ./scripts/toggle-mcp.js <suite-or-server> [on|off|toggle]
 *
 * Examples:
 *   ./scripts/toggle-mcp.js database-suite on      # Enable entire suite
 *   ./scripts/toggle-mcp.js postgres off           # Disable single server
 *   ./scripts/toggle-mcp.js research-suite toggle  # Toggle suite
 */

const fs = require('fs');
const path = require('path');

// Color codes
const colors = {
  reset: '\033[0m',
  red: '\033[0;31m',
  green: '\033[0;32m',
  yellow: '\033[1;33m',
  blue: '\033[0;34m'
};

// Get arguments
const target = process.argv[2];
const action = process.argv[3] || 'toggle';
const configFile = '.mcp.json';
const projectRoot = path.dirname(__dirname);
const configPath = path.join(projectRoot, configFile);

/**
 * Print colored output
 */
function log(color, text) {
  console.log(`${colors[color]}${text}${colors.reset}`);
}

/**
 * Print usage information
 */
function printUsage() {
  log('blue', 'MCP Server Toggle for Claude Code');
  console.log('');
  console.log('Usage: toggle-mcp.js <suite-or-server> [on|off|toggle]');
  console.log('');
  console.log('Examples:');
  console.log('  ./scripts/toggle-mcp.js database-suite on       # Enable all database servers');
  console.log('  ./scripts/toggle-mcp.js postgres off            # Disable single server');
  console.log('  ./scripts/toggle-mcp.js frontend-suite toggle   # Toggle frontend suite');
  console.log('');

  if (fs.existsSync(configPath)) {
    try {
      const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

      console.log('Available suites:');
      Object.keys(config.suites).forEach(suite => {
        console.log(`  - ${suite}`);
      });

      console.log('');
      console.log('Available servers:');
      Object.keys(config.mcpServers).forEach(server => {
        console.log(`  - ${server}`);
      });
    } catch (e) {
      log('red', `  Error parsing ${configFile}`);
    }
  } else {
    log('red', `  Error: ${configFile} not found`);
  }
}

/**
 * Main function
 */
function main() {
  // Check if config file exists
  if (!fs.existsSync(configPath)) {
    log('red', `✗ Error: ${configFile} not found at ${configPath}`);
    console.log('');
    printUsage();
    process.exit(1);
  }

  // Show usage if no target provided
  if (!target) {
    printUsage();
    process.exit(1);
  }

  // Read and parse config
  let config;
  try {
    const configData = fs.readFileSync(configPath, 'utf8');
    config = JSON.parse(configData);
  } catch (error) {
    log('red', `✗ Error parsing ${configFile}: ${error.message}`);
    process.exit(1);
  }

  // Check if target is a suite or server
  const isSuite = config.suites && config.suites[target];
  const isServer = config.mcpServers && config.mcpServers[target];

  if (!isSuite && !isServer) {
    log('red', `✗ Error: '${target}' is neither a suite nor a server`);
    console.log('');
    printUsage();
    process.exit(1);
  }

  // Determine which servers to toggle
  let servers = [];
  let label = '';

  if (isSuite) {
    servers = config.suites[target];
    label = `suite: ${colors.yellow}${target}${colors.blue}`;
  } else {
    servers = [target];
    label = `server: ${colors.yellow}${target}${colors.blue}`;
  }

  // Process toggle
  log('blue', `Toggling MCP ${label}`);
  console.log('');

  for (const server of servers) {
    // Check if server exists in config
    if (!config.mcpServers[server]) {
      log('yellow', `⚠ Skipped: Server '${server}' not found in config`);
      continue;
    }

    if (action === 'on') {
      config.mcpServers[server].enabled = true;
      log('green', `✓ Enabled:  ${server}`);
    } else if (action === 'off') {
      config.mcpServers[server].enabled = false;
      log('red', `✗ Disabled: ${server}`);
    } else if (action === 'toggle') {
      const current = config.mcpServers[server].enabled;
      const newValue = !current;
      config.mcpServers[server].enabled = newValue;
      const status = newValue ? 'enabled' : 'disabled';
      log('yellow', `⊙ Toggled:   ${server} (${status})`);
    } else {
      log('red', `✗ Error: Unknown action '${action}'`);
      process.exit(1);
    }
  }

  // Write updated config back to file
  try {
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2) + '\n');
  } catch (error) {
    log('red', `✗ Error writing ${configFile}: ${error.message}`);
    process.exit(1);
  }

  console.log('');
  log('green', `✓ Success! Updated: ${configFile}`);
  console.log('');

  if (isSuite) {
    console.log(`Enabled servers in suite '${target}':`);
    servers.forEach(server => {
      const enabled = config.mcpServers[server].enabled;
      const status = enabled ? `${colors.green}✓${colors.reset}` : `${colors.red}✗${colors.reset}`;
      console.log(`  ${status} ${server}`);
    });
  } else {
    const enabled = config.mcpServers[target].enabled;
    const status = enabled ? `${colors.green}✓ Enabled${colors.reset}` : `${colors.red}✗ Disabled${colors.reset}`;
    console.log(`Server '${target}': ${status}`);
  }
}

// Run
main();
