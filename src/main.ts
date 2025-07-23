import { restoreCache, saveCache } from '@actions/cache'
import * as core from '@actions/core'
import * as toolCache from '@actions/tool-cache'
import os from 'os'
import path from 'path'

/**
 * The main function for the action.
 *
 * @returns Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const version = '2.1.1'
    const key = `ossutil-${version}-linux-amd64`
    core.debug(key)

    const homedir = os.homedir()
    core.debug(homedir)

    const execPath = path.join(homedir, key)
    core.debug(execPath)

    const hitKey = await restoreCache([execPath], key)

    if (typeof hitKey === 'undefined') {
      const downloadPath = await toolCache.downloadTool(
        `https://gosspublic.alicdn.com/ossutil/v2/${version}/${key}.zip`
      )
      await toolCache.extractZip(downloadPath, homedir)
      await saveCache([execPath], key)
    }

    core.addPath(execPath)
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
