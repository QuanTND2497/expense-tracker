# Migrating from DaisyUI to Shadcn UI

This document provides guidance on migrating from DaisyUI to Shadcn UI in the Expense Tracker application.

## Overview

We're migrating from DaisyUI to Shadcn UI for several reasons:
- Better TypeScript support and type safety
- More customizable components through native styling
- Improved accessibility
- Consistent styling and theming
- Better maintainability

## Migration Steps

### 1. Update Dependencies

The following dependencies have been added:
- `class-variance-authority` for styling variants
- `clsx` and `tailwind-merge` for class name utilities
- `lucide-react` for icons

DaisyUI and anime.js have been removed from the dependencies.

### 2. Tailwind Configuration

The tailwind configuration has been updated to:
- Remove the DaisyUI plugin
- Add proper theme configuration for Shadcn UI
- Define color variables in the theme
- Include animation and keyframe definitions

### 3. Component Map

Here's a mapping of DaisyUI components to their Shadcn UI equivalents:

| DaisyUI Component | Shadcn UI Component |
|-------------------|-------------------|
| Button | Button |
| Modal | Dialog |
| Tabs | Tabs |
| Toast | SimpleToast |
| Input | Input |
| Select | Select |
| Card | Card |
| Checkbox | Checkbox |
| Avatar | Avatar |
| Badge | Badge |

### 4. Component Usage Examples

#### Button

```tsx
// Old (DaisyUI)
<button className="btn btn-primary">Click me</button>

// New (Shadcn UI)
import { Button } from "@/components/ui/button"

<Button variant="default">Click me</Button>
```

#### Dialog (Modal)

```tsx
// Old (DaisyUI)
<dialog id="my_modal" className="modal">
  <div className="modal-box">
    <h3>Hello!</h3>
    <p>Modal content</p>
    <div className="modal-action">
      <form method="dialog">
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>

// New (Shadcn UI)
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

<Dialog>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Hello!</DialogTitle>
      <DialogDescription>Modal content</DialogDescription>
    </DialogHeader>
    <div>Content here</div>
  </DialogContent>
</Dialog>
```

#### Tabs

```tsx
// Old (DaisyUI)
<div role="tablist" className="tabs tabs-bordered">
  <a role="tab" className="tab tab-active">Tab 1</a>
  <a role="tab" className="tab">Tab 2</a>
</div>

// New (Shadcn UI)
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>
```

#### Toast

```tsx
// Old (react-toastify)
import { toast } from "react-toastify"

toast.success("Success message")

// New (SimpleToast)
import { useToast } from "@/components/ui/simple-toast"

const { success } = useToast()
success({ 
  title: "Success", 
  description: "Success message" 
})
```

### 5. Theme Class Changes

- Replace `data-theme="light"` or `data-theme="dark"` with `class="light"` or `class="dark"`
- CSS variables have been updated in `globals.css` to match the Shadcn UI naming convention

### 6. Animation Changes

- Replace anime.js animations with CSS animations defined in the Tailwind config
- Use the provided animation utilities like `animate-in`, `fade-in`, etc.

## Toast System

We've created a simplified toast system that doesn't rely on Radix UI to avoid compatibility issues with React 19. The new system includes:

1. **ToastProvider** - A context provider that manages toast state
2. **useToast** - A hook for creating and managing toasts
3. **Toaster** - A component that displays toast notifications

For detailed documentation on the toast system, see [SIMPLE_TOAST_USAGE.md](./SIMPLE_TOAST_USAGE.md).

## Getting Help

If you encounter issues during migration:
1. Refer to the component implementation in the `frontend/components/ui` directory
2. Check the usage examples in the docs directory
3. Look at existing implementation examples in the codebase 