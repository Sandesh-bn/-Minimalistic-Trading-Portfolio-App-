import { Button } from "@/components/ui/button"
import { ChevronRightIcon } from "lucide-react"

function App() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <Button variant="outline">Click me</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="secondary" size="icon" className="size-8">
      <ChevronRightIcon />
    </Button>
    </div>
  )
}

export default App