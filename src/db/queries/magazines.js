import { magazines } from '../schema'
import { db } from '../db'

export async function getMagazines() {  // Changed function name to match your usage
  try {
    const magazinesList = await db
      .select({
        id: magazines.id,
        name: magazines.name,
        year: magazines.year,
        thumbnailUrl: magazines.thumbnailUrl,
        pdfUrl: magazines.pdfUrl
      })
      .from(magazines)
      .where(magazines.in_carousal)
      .orderBy(magazines.createdAt)

    return magazinesList
  } catch (error) {
    console.error('Error fetching magazines:', error)
    return []
  }
}