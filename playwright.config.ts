import { defineConfig, devices } from '@playwright/test'
import { BASE_URL } from './e2e-tests/const'
import dotenv from 'dotenv'
import path from 'path'

// Read from ".env" file.
dotenv.config({ path: path.resolve(__dirname, '.env') })

/** See https://playwright.dev/docs/test-configuration. */
export default defineConfig({
	// Each test is given 120 seconds.
	timeout: 120 * 1000,
	testDir: './e2e-tests',
	/* Run tests in files in parallel */
	fullyParallel: true,
	/* Fail the build on CI if you accidentally left test.only in the source code. */
	forbidOnly: !!process.env.CI,
	/* Retry on CI only */
	retries: process.env.CI ? 1 : 0,
	/* Opt out of parallel tests on CI. */
	workers: process.env.CI ? 1 : undefined,
	/* Reporter to use. See https://playwright.dev/docs/test-reporters */
	reporter: [['html'], ['list']],
	expect: {
		timeout: 10 * 1000,
	},
	/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
	use: {
		/* Base URL to use in actions like `await page.goto('/')`. */
		baseURL: BASE_URL,
		/* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
		trace: 'on-first-retry',
	},

	/* Configure projects for major browsers */
	projects: [
		{
			name: 'setup',
			testMatch: /.*\.setup\.ts/,
		},
		// {
		//   name: 'chromium',
		//   use: { ...devices['Desktop Chrome'] },
		// },

		// {
		//   name: 'firefox',
		//   use: { ...devices['Desktop Firefox'] },
		// },

		// {
		//   name: 'webkit',
		//   use: { ...devices['Desktop Safari'] },
		// },

		/* Test against mobile viewports. */
		// {
		//   name: 'Mobile Chrome',
		//   use: { ...devices['Pixel 5'] },
		// },
		// {
		//   name: 'Mobile Safari',
		//   use: { ...devices['iPhone 12'] },
		// },

		/* Test against branded browsers. */
		// {
		//   name: 'Microsoft Edge',
		//   use: { ...devices['Desktop Edge'], channel: 'msedge' },
		// },
		{
			name: 'Google Chrome',
			use: { ...devices['Desktop Chrome'], channel: 'chrome' },
			dependencies: ['setup'],
		},
	],

	/* Run your local dev server before starting the tests */
	webServer: {
		command: 'pnpm dev',
		url: `${BASE_URL}`,
		reuseExistingServer: false,
		stdout: 'pipe',
		timeout: 120 * 1000,
	},
})
