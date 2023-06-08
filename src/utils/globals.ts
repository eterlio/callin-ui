import { TYPE, useToast } from "vue-toastification";

interface ToastOptions {
  title?: string;
  message: string;
  duration?: number;
  type?: TYPE;
}

const toast = useToast();
export const successNotification = (options: ToastOptions) => {
  toast(options.message, {
    type: TYPE.SUCCESS,
  });
};
export const errorNotification = (options: ToastOptions) => {
  toast(options.message, {
    type: TYPE.ERROR,
  });
};
