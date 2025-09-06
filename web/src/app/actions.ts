'use server'

import { revalidatePath } from 'next/cache'

export async function pingDiagnostics() {
  // placeholder server function (extend for real mutations)
  revalidatePath('/')
  return { ok: true }
}

