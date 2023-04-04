import { redirect } from '@sveltejs/kit'

export const load = async function () {
  throw redirect(303, '/posts/gaussian')
}
