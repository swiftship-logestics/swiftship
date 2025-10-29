// composables/useToast.ts
import { toast, toastContainers, Slide } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export const useToast = () => {
  const defaultOptions = {
    position: 'bottom-center' as const,
    autoCloseDelay: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    transition: Slide,
  }

  const info = (msg: string) => toast.info(msg, defaultOptions)
  const success = (msg: string) => toast.success(msg, defaultOptions)
  const error = (msg: string) => toast.error(msg, defaultOptions)

  return { info, success, error }
}

export { toastContainers }
