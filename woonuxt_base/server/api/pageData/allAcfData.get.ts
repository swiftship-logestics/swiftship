import { defineEventHandler, getQuery } from 'h3'

export default defineEventHandler(async (event) => {
  // Page ID can be sent as query ?id=455, defaults to 455
  const query = getQuery(event)
  const pageId = query.id

  const acfData: Record<string, any> = {}
  const acfImages: Record<string, string | null> = {}

  // Helper to fetch WordPress media by ID
  const getImageUrl = async (id: number) => {
    if (!id) return null
    try {
      const res = await fetch(`https://admin.swiftshiplogistics.com.au/wp-json/wp/v2/media/${id}`)
      if (!res.ok) return null
      const img = await res.json()
      return img.source_url
    } catch {
      return null
    }
  }

  try {
    // Fetch the page
    const res = await fetch(`https://admin.swiftshiplogistics.com.au/wp-json/wp/v2/pages/${pageId}`)
    console.log("res:::::::::::::::::",res)
    if (!res.ok) throw new Error('Failed to fetch page')
    const pageData = await res.json()

    Object.assign(acfData, pageData.acf || {})


   // Recursive function to find image IDs
    const extractImages = async (obj:any, prefix = '') => {
      for (const [key, value] of Object.entries(obj)) {
        const fullKey = prefix ? `${prefix}.${key}` : key

        if (typeof value === 'number') {
          acfImages[fullKey] = await getImageUrl(value)
        } else if (value && typeof value === 'object') {
          await extractImages(value, fullKey)
        }
      }
    }

    // Run recursive image extraction
    await extractImages(acfData)

    return {
      acfData,
      acfImages
    }
  } catch (err: any) {
    return {
      error: true,
      message: err.message || 'Something went wrong'
    }
  }
})
