declare global {
  interface Window {
    Razorpay: Function
  }
}

interface Window {
  clarity?: (...args: any[]) => void;
  dataLayer: any[];
  gtag?: (...args: any[]) => void;
}