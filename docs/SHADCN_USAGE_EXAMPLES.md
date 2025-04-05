# Shadcn UI Components Usage Examples

This document provides examples of how to use the Shadcn UI components in your application.

## Table of Contents
- [Button](#button)
- [Dialog](#dialog)
- [Toast](#toast)
- [Tabs](#tabs)
- [Card](#card)
- [Input](#input)
- [Select](#select)
- [Checkbox](#checkbox)
- [Avatar](#avatar)
- [Badge](#badge)

## Button

The Button component supports various styles and states, including loading states.

```tsx
import { Button } from "@/components/ui/button";

// Default button
<Button>Click me</Button>

// Button with variants
<Button variant="default">Default</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// Button sizes
<Button size="default">Default Size</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="icon">🔍</Button>

// Loading state
<Button isLoading>Loading</Button>

// Disabled state
<Button disabled>Disabled</Button>

// As child
<Button asChild>
  <a href="/dashboard">Dashboard</a>
</Button>
```

## Dialog

The Dialog component is used for creating modal dialogs.

```tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Open Dialog</Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-[425px]">
    <DialogHeader>
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogDescription>
        Make changes to your profile here. Click save when you're done.
      </DialogDescription>
    </DialogHeader>
    <div className="grid gap-4 py-4">
      {/* Dialog content */}
    </div>
    <DialogFooter>
      <Button type="submit">Save changes</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

## Toast

The Toast component is used for showing notifications.

```tsx
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

export function ToastDemo() {
  const { toast } = useToast();

  return (
    <div>
      <Button
        onClick={() => {
          toast({
            title: "Scheduled",
            description: "Your appointment has been scheduled.",
          });
        }}
      >
        Show Toast
      </Button>

      {/* Success toast */}
      <Button
        onClick={() => {
          toast.success({
            title: "Success!",
            description: "Your changes have been saved.",
          });
        }}
      >
        Success Toast
      </Button>

      {/* Error toast */}
      <Button
        onClick={() => {
          toast.error({
            title: "Error!",
            description: "There was a problem with your request.",
          });
        }}
      >
        Error Toast
      </Button>

      {/* Warning toast */}
      <Button
        onClick={() => {
          toast.warning({
            title: "Warning!",
            description: "Your account is about to expire.",
          });
        }}
      >
        Warning Toast
      </Button>

      {/* Info toast */}
      <Button
        onClick={() => {
          toast.info({
            title: "Information",
            description: "A new update is available.",
          });
        }}
      >
        Info Toast
      </Button>
    </div>
  );
}
```

## Tabs

The Tabs component is used for organizing content into separate views.

```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

<Tabs defaultValue="account" className="w-[400px]">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">
    <p>Account settings content here</p>
  </TabsContent>
  <TabsContent value="password">
    <p>Password settings content here</p>
  </TabsContent>
</Tabs>
```

## Card

The Card component is used for displaying content in a card format.

```tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

<Card className="w-[350px]">
  <CardHeader>
    <CardTitle>Create project</CardTitle>
    <CardDescription>Deploy your new project in one-click.</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content goes here.</p>
  </CardContent>
  <CardFooter className="flex justify-between">
    <Button variant="outline">Cancel</Button>
    <Button>Deploy</Button>
  </CardFooter>
</Card>
```

## Input

The Input component is used for getting user input in a form.

```tsx
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

// Basic input
<Input placeholder="Email" type="email" />

// With error state
<Input error placeholder="Username" />

// With icons
<Input 
  placeholder="Search..." 
  iconLeft={<Search className="h-4 w-4" />} 
/>

// With right icon
<Input 
  placeholder="Password" 
  type="password" 
  iconRight={<Button variant="ghost" size="icon">👁️</Button>} 
/>
```

## Select

The Select component is used for selecting a value from a list of options.

```tsx
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

<Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Select a fruit" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>Fruits</SelectLabel>
      <SelectItem value="apple">Apple</SelectItem>
      <SelectItem value="banana">Banana</SelectItem>
      <SelectItem value="orange">Orange</SelectItem>
      <SelectItem value="grape">Grape</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>
```

## Checkbox

The Checkbox component is used for toggling between checked and unchecked states.

```tsx
import { Checkbox } from "@/components/ui/checkbox";

<div className="flex items-center space-x-2">
  <Checkbox id="terms" />
  <label
    htmlFor="terms"
    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
  >
    Accept terms and conditions
  </label>
</div>
```

## Avatar

The Avatar component is used for displaying user avatars with fallback initials.

```tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

<Avatar>
  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
  <AvatarFallback>CN</AvatarFallback>
</Avatar>
```

## Badge

The Badge component is used for highlighting or labeling elements.

```tsx
import { Badge } from "@/components/ui/badge";

// Default badge
<Badge>New</Badge>

// Badge variants
<Badge variant="default">Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="destructive">Destructive</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="info">Info</Badge>
``` 