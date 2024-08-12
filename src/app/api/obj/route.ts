import { getModel } from '@/global/model'
import { JSONParseError, NoObjectGeneratedError, TypeValidationError, generateObject } from 'ai'
import { NextRequest } from 'next/server'
import { z } from 'zod'

const recipeSchema = z.object({
  recipe: z.object({
    name: z.string(),
    ingredients: z.array(z.object({ name: z.string(), amount: z.string() })),
    steps: z.array(z.string())
  })
})

type Recipe = z.infer<typeof recipeSchema>

export async function GET(req: NextRequest) {
  const food = req.nextUrl.searchParams.get('food')

  try {
    const result = await generateObject({
      model: getModel(),
      schema: recipeSchema,
      prompt: `Generate a ${food} recipe.`
    })

    return Response.json({ type: 'success', recipe: result.object })
  } catch (error) {
    if (TypeValidationError.isInstance(error)) {
      return Response.json({ type: 'validation-error', value: error.value })
    } else if (JSONParseError.isInstance(error)) {
      return Response.json({ type: 'parse-error', text: error.text })
    } else if (NoObjectGeneratedError.isInstance(error)) {
      return Response.json({ type: 'no-object-generated', message: error.message })
    } else {
      return Response.json({ type: 'unknown-error', error })
    }
  }
}
