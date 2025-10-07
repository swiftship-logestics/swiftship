import axios from 'axios'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  try {
    const response = await axios.post(
      'https://development.brstdev.com/swiftship/wp-json/wc/v3/products',
      body,
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${process.env.CONSUMER_KEY}:${process.env.CONSUMER_SECRET}`
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
