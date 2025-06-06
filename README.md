# 🌍 Planet Toast

A beautiful, lightweight, and customizable toast notification library for React applications with full TypeScript support.

## Features

- 🎨 Beautiful, modern design with smooth animations
- 🎯 TypeScript support out of the box
- 🚀 Lightweight with zero dependencies
- 🎭 Multiple toast types (success, error, loading, default)
- 📍 Flexible positioning options
- 🔄 Promise-based toasts
- ⚡ Easy to use API similar to react-hot-toast
- 🎨 Customizable styling

## Installation

```bash
npm install planet-toast
```

## Quick Start

1. Add the Toaster component to your app:

```tsx
import React from "react";
import { Toaster } from "planet-toast";

function App() {
  return (
    <div>
      {/* Your app content */}
      <Toaster />
    </div>
  );
}
```

2. Start creating toasts:

```tsx
import { toast } from "planet-toast";

// Basic toast
toast("Hello World!");

// Success toast
toast.success("Profile updated successfully!");

// Error toast
toast.error("Something went wrong!");

// Loading toast
toast.loading("Uploading...");
```

## API Reference

### toast()

Create different types of toasts:

```tsx
import { toast } from "planet-toast";

// Default toast
toast("Hello World!");

// Success toast
toast.success("Operation completed!");

// Error toast
toast.error("Something went wrong!");

// Loading toast (doesn't auto-dismiss)
toast.loading("Loading...");

// Custom duration
toast("Custom duration", { duration: 6000 });

// Custom ID (useful for updating)
toast.loading("Uploading...", { id: "upload" });
toast.success("Upload complete!", { id: "upload" });
```

### toast.promise()

Handle promises with automatic toast updates:

```tsx
const uploadPromise = fetch("/api/upload", {
  method: "POST",
  body: formData,
});

toast.promise(uploadPromise, {
  loading: "Uploading file...",
  success: "File uploaded successfully!",
  error: "Upload failed. Please try again.",
});
```

### toast.dismiss() & toast.remove()

```tsx
// Dismiss a specific toast
const toastId = toast("Hello");
toast.dismiss(toastId);

// Remove a toast immediately
toast.remove(toastId);
```

### Toaster Component

Configure the toast container:

```tsx
<Toaster
  position="top-right"
  reverseOrder={false}
  gutter={8}
  containerStyle={{}}
  toastOptions={{
    duration: 4000,
  }}
/>
```

#### Props

- `position`: Toast position (`top-left`, `top-center`, `top-right`, `bottom-left`, `bottom-center`, `bottom-right`)
- `reverseOrder`: Reverse the order of toasts
- `gutter`: Space between toasts in pixels
- `containerStyle`: Custom styles for the container
- `toastOptions`: Default options for all toasts

## TypeScript Support

Planet Toast is built with TypeScript and provides full type safety:

```tsx
import { ToastType, ToastOptions, ToastPosition } from "planet-toast";

const customToast = (
  message: string,
  type: ToastType,
  options?: ToastOptions
) => {
  // Your custom logic
};
```

## Examples

### React Hook Integration

```tsx
import { useToasts } from "planet-toast";

function ToastManager() {
  const toasts = useToasts();

  return (
    <div>
      <p>Active toasts: {toasts.length}</p>
    </div>
  );
}
```

### Custom Styling

```tsx
<Toaster
  containerStyle={{
    top: "20px",
    fontSize: "16px",
  }}
  toastOptions={{
    duration: 5000,
  }}
/>
```

## License

MIT © Planet Toast

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
