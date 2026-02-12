import * as React from "react"
import { Check, MapPin, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { locations } from "@/data/mockData"

interface LocationFilterProps {
    value: string
    onChange: (value: string) => void
    className?: string
    placeholder?: string
}

export function LocationFilter({ value, onChange, className, placeholder = "Select location" }: LocationFilterProps) {
    const [open, setOpen] = React.useState(false)

    // Filter out "All Locations" for the list if desired, or keep it. 
    // Let's keep it but maybe treat it specially if needed.
    // For now, just map all locations.

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="ghost"
                    role="combobox"
                    aria-expanded={open}
                    className={cn("w-full justify-between hover:bg-transparent", className)}
                >
                    <div className="flex items-center gap-2 truncate">
                        <MapPin className="h-4 w-4 shrink-0 opacity-50" />
                        <span className="truncate">
                            {value === "All Locations" ? "All Locations" : value}
                        </span>
                    </div>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0" align="start">
                <Command>
                    <CommandInput placeholder="Search location..." />
                    <CommandList>
                        <CommandEmpty>No location found.</CommandEmpty>
                        <CommandGroup>
                            {locations.map((location) => (
                                <CommandItem
                                    key={location}
                                    value={location}
                                    onSelect={(currentValue) => {
                                        onChange(currentValue === value ? "" : currentValue)
                                        setOpen(false)
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === location ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {location}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
