import axios from 'axios'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const API_URL = process.env.WC_API_URL
  const CONSUMER_KEY = process.env.CONSUMER_KEY
  const CONSUMER_SECRET = process.env.CONSUMER_SECRET
  try {
    const response = await axios.post(
      `${API_URL}/products`,
      body,
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${CONSUMER_KEY}:${CONSUMER_SECRET}`
          ).toString('base64')}`,
          'Content-Type': 'application/json'
        }
      }
    )

    return response.data
  } catch (err) {
    console.error('Server API error:', err)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to create product'
    })
  }
})
