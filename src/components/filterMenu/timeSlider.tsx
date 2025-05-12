import React from 'react'
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/lib/utils";


const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20">
      <SliderPrimitive.Range className="absolute h-full bg-primary" />
    </SliderPrimitive.Track>
    {(props.value ?? props.defaultValue)?.map((_, index) => (
      <SliderPrimitive.Thumb
        key={index}
        className="block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
      />
    ))}
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

type componentProps = {
  changeTime: (timeRange: number[]) => void;
  departureTimes: number[]
}

const TimeSlider = ({changeTime, departureTimes}: componentProps) => {
    const [value, setValue] = React.useState([600, 800]);
    const [from, to] = departureTimes
    return (
      <div className="w-full max-w-sm mx-auto">
        <div className="w-full flex items-center justify-between gap-2">
          <span className="text-sm text-muted-foreground">00:00</span>
          <Slider value={departureTimes} onValueChange={(val) => changeTime(val)} max={2400} step={100} />
          <span className="text-sm text-muted-foreground">24:00</span>
        </div>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          {from} - {to}
        </p>
      </div>
    );
}

export default TimeSlider