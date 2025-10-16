import Swal from "sweetalert2";

// Default config yang bisa kamu override di setiap pemanggilan
const defaultConfig = {
  title: "Info",
  text: "",
  icon: "info", // success, error, warning, info, question
  confirmButtonText: "OK",
  showCancelButton: false,
  cancelButtonText: "Cancel",
  timer: null, // misal 2000 untuk auto close setelah 2 detik
  timerProgressBar: false,
  position: "center", // 'top', 'top-start', 'top-end', 'center', 'center-start', 'center-end', 'bottom', 'bottom-start', 'bottom-end'
  allowOutsideClick: true,
  allowEscapeKey: true,
  allowEnterKey: true,
  reverseButtons: false,
  showLoaderOnConfirm: false,
  preConfirm: null, // async function untuk validasi sebelum confirm close
  footer: null,
  customClass: null,
  // dll bisa kamu tambah sesuai kebutuhan SweetAlert2 docs
};

const showAlert = (options = {}) => {
  const config = { ...defaultConfig, ...options };

  return Swal.fire(config);
};

// Helper untuk alert success
export const showSuccess = (title, text, options = {}) =>
  showAlert({ icon: "success", title, text, ...options });

// Helper untuk alert error
export const showError = (title, text, options = {}) =>
  showAlert({ icon: "error", title, text, ...options });

// Helper untuk alert warning
export const showWarning = (title, text, options = {}) =>
  showAlert({ icon: "warning", title, text, ...options });

// Helper untuk alert info
export const showInfo = (title, text, options = {}) =>
  showAlert({ icon: "info", title, text, ...options });

// Helper untuk konfirmasi yes/no
export const showConfirm = (title, text, options = {}) =>
  Swal.fire({
    title,
    text,
    icon: "question",
    showCancelButton: true,
    confirmButtonText: options.confirmButtonText || "Yes",
    cancelButtonText: options.cancelButtonText || "No",
    reverseButtons: options.reverseButtons || false,
    ...options,
  });

export default showAlert;
