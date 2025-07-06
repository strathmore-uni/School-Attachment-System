import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      <ol style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {toasts.map(function ({ id, title, description, action, ...props }) {
          return (
            <li key={id}>
              <Toast {...props}>
                <div className="grid gap-1">
                  {title && <ToastTitle>{title}</ToastTitle>}
                  {description && (
                    <ToastDescription>{description}</ToastDescription>
                  )}
                </div>
                {action}
                <ToastClose
                  type="button"
                  aria-label="Close"
                />
              </Toast>
            </li>
          )
        })}
      </ol>
      <ToastViewport />
    </ToastProvider>
  )
}
