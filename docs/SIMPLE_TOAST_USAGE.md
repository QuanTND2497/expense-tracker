# Simple Toast System Usage Guide

This document provides examples of how to use the simplified toast notification system.

## Basic Usage

The toast system can be used to display notifications to the user. Here's how to use it:

```tsx
"use client"

import { useToast } from "@/components/ui/simple-toast"
import { Button } from "@/components/ui/button"

export function ToastDemo() {
  const { toast, success, error, warning, info } = useToast()

  return (
    <div className="flex flex-col gap-4">
      {/* Basic toast */}
      <Button 
        onClick={() => 
          toast({
            title: "Basic Toast",
            description: "This is a basic toast notification",
          })
        }
      >
        Show Toast
      </Button>

      {/* Success toast */}
      <Button 
        onClick={() => 
          success({
            title: "Success!",
            description: "Operation completed successfully",
          })
        }
      >
        Success Toast
      </Button>

      {/* Error toast */}
      <Button 
        onClick={() => 
          error({
            title: "Error!",
            description: "Something went wrong",
          })
        }
      >
        Error Toast
      </Button>

      {/* Warning toast */}
      <Button 
        onClick={() => 
          warning({
            title: "Warning",
            description: "Please be careful with this action",
          })
        }
      >
        Warning Toast
      </Button>

      {/* Info toast */}
      <Button 
        onClick={() => 
          info({
            title: "Information",
            description: "Here's something you should know",
          })
        }
      >
        Info Toast
      </Button>
    </div>
  )
}
```

## Adding Custom Actions

You can add custom actions to your toast notifications:

```tsx
import { useToast } from "@/components/ui/simple-toast"
import { Button } from "@/components/ui/button"

export function ToastWithAction() {
  const { toast } = useToast()

  const showToastWithAction = () => {
    toast({
      title: "New message",
      description: "You received a new message",
      action: (
        <Button 
          size="sm" 
          variant="outline" 
          onClick={() => console.log("Action clicked")}
          className="ml-4"
        >
          View
        </Button>
      ),
    })
  }

  return (
    <Button onClick={showToastWithAction}>
      Show Toast with Action
    </Button>
  )
}
```

## System Setup

The toast system is already set up in the application. The core components are:

1. `ToastProvider` - Provides the toast functionality to your application
2. `Toaster` - Displays the toast notifications
3. `useToast` - Hook to create and manage toasts

The `ToastProvider` is included in the app's providers, and the `Toaster` component is already added to the main layout files.

## API Reference

### useToast Hook

The `useToast` hook returns an object with the following properties and methods:

| Name | Type | Description |
|------|------|-------------|
| `toasts` | `Toast[]` | Array of all active toast notifications |
| `toast` | `(props: ToastProps) => string` | Show a basic toast notification |
| `success` | `(props: ToastProps) => string` | Show a success toast |
| `error` | `(props: ToastProps) => string` | Show an error toast |
| `warning` | `(props: ToastProps) => string` | Show a warning toast |
| `info` | `(props: ToastProps) => string` | Show an info toast |
| `remove` | `(id: string) => void` | Remove a specific toast by ID |
| `update` | `(id: string, props: Partial<Toast>) => void` | Update an existing toast |

### Toast Properties

When creating a toast, you can use the following properties:

| Property | Type | Description |
|----------|------|-------------|
| `title` | `React.ReactNode` | Toast title |
| `description` | `React.ReactNode` | Toast description |
| `variant` | `"default" \| "destructive" \| "success" \| "warning" \| "info"` | Toast style variant |
| `action` | `React.ReactNode` | Optional action element (like a button) |

## Example: Creating a Toast Service

For reusable toast notifications, you can create a service:

```tsx
// services/toast-service.ts
import { useToast } from "@/components/ui/simple-toast"

export function useToastService() {
  const toast = useToast()
  
  return {
    notifySuccess: (message: string) => {
      toast.success({
        title: "Success",
        description: message,
      })
    },
    
    notifyError: (message: string) => {
      toast.error({
        title: "Error",
        description: message,
      })
    },
    
    notifyFormSaved: () => {
      toast.success({
        title: "Changes saved",
        description: "Your changes have been saved successfully.",
      })
    },
    
    notifyFormError: () => {
      toast.error({
        title: "Couldn't save",
        description: "There was a problem saving your changes. Please try again.",
      })
    }
  }
} 