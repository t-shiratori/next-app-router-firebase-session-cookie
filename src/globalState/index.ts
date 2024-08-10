import { atomWithReset } from 'jotai/utils'

export const authToken = atomWithReset<undefined | string>(undefined)
