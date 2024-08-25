/**
 * logger for nodejs
 */

const reset = '\x1b[0m'

export const clog = {
	green: (text: string) => console.log(`\x1b[32m ${text} ${reset}`),
	red: (text: string) => console.log(`\x1b[31m ${text} ${reset}`),
	blue: (text: string) => console.log(`\x1b[34m ${text} ${reset}`),
	yellow: (text: string) => console.log(`\x1b[33m ${text} ${reset}`),
}

export const marker = {
	green: (text: string) => `\x1b[32m ${text} ${reset}`,
	red: (text: string) => `\x1b[31m ${text} ${reset}`,
	blue: (text: string) => `\x1b[34m ${text} ${reset}`,
	yellow: (text: string) => `\x1b[33m ${text} ${reset}`,
}
