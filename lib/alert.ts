import Swal, { SweetAlertOptions } from 'sweetalert2'

/**
 * Base compact template (inheritance root)
 */
const BaseAlert = Swal.mixin({
  width: 320,
  padding: '1rem!',
  iconHtml: '',
  buttonsStyling: false,
  customClass: {
    popup: 'rounded-lg! text-sm! p-2!',
    icon: 'scale-70',
    htmlContainer: 'text-sm!',
    confirmButton:
      'px-4 py-2 rounded-md text-sm font-medium bg-amber-500 text-black',
    cancelButton:
      'px-4 py-2 rounded-md text-sm font-medium bg-slate-700 text-white ml-2'
  }
})

/**
 * Generic fire (optional extension point)
 */
export function fire(options: SweetAlertOptions) {
  return BaseAlert.fire(options)
}

/**
 * Error alert (inherits BaseAlert)
 */
export function showError(message: string) {
  return BaseAlert.fire({
    icon: 'error',
    title: 'Error',
    text: message,

    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    allowOutsideClick: false,
    allowEscapeKey: false,
  })
}

/**
 * Success alert (inherits BaseAlert)
 */
export function showSuccess(message: string) {
  return BaseAlert.fire({
    icon: 'success',
    title: 'Success',
    text: message,

    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    allowOutsideClick: false,
    allowEscapeKey: false,

  })
}

/**
 * Confirm alert (inherits BaseAlert)
 */
export function showConfirm(message: string) {
  return BaseAlert.fire({
    icon: 'warning',
    title: 'Confirm',
    text: message,
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'Cancel'
  })
}

/**
 * Settlement alert (inherits BaseAlert)
 */
export function showSettle(message: string) {
  return BaseAlert.fire({
    icon: 'warning',
    title: 'Settlement',
    text: message,
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'Cancel'
  })
}

/**
 * Cancel alert (inherits BaseAlert)
 */
export function showCancel(message: string) {
  return BaseAlert.fire({
    icon: 'warning',
    title: 'Cancel',
    text: message,
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'Cancel'
  })
}

/**
 * Compact toast (separate compact style)
 */
const ToastAlert = Swal.mixin({
  toast: true,
  position: 'top-end',
  iconHtml: '',
  timer: 2000,
  timerProgressBar: true,
  showConfirmButton: false,
  customClass: {
    popup: 'p-2!',
    htmlContainer: 'pt-1.5!',
    icon: 'scale-75'
  }
})

export function showToast(
  message: string,
  icon: 'success' | 'error' | 'warning' | 'info' = 'success'
) {
  return ToastAlert.fire({
    icon,
    html: message
  })
}
