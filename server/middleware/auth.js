import { clerkClient } from '@clerk/express'

export const auth = async (req, res, next) => {
  try {
    const { userId, has } = req.auth()   // ❗ no await here

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" })
    }

    const hasPremiumPlan = await has({ plan: 'premium' })

    const user = await clerkClient.users.getUser(userId)

    // Initialize if not present
    const freeUsage = user.privateMetadata?.free_usage || 0

    if (!hasPremiumPlan) {
      req.free_usage = freeUsage
    } else {
      // Reset free usage if premium
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: 0
        }
      })

      req.free_usage = 0
    }

    req.plan = hasPremiumPlan ? 'premium' : 'free'

    next()
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: error.message })
  }
}