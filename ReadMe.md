- A react native custom component of dynamic spinner Datepicker, with initial date and animated scroll to it's position. the spinner is implemented as 3 animated wheels effect.

- It comes with a built-in TypeScript typings and is compatible with all popular JavaScript frameworks including React , Vue , Svelte , and Angular . You can use RN-Animated-Donut-Chart directly or leverage well-maintained wrapper packages that allow for a more native integration with your frameworks of choice.

# examples:

![](./assets/videos/1.gif)

# How to use:

```
    <SpinnerDatePicker
        initialDate={new Date()}
        onSelectedDate={date => {
          console.log(date.toUTCString());
        }}
      />
```

> **Dataset Properties**

| Name           | Type                 | Default |
| -------------- | -------------------- | ------- |
| height         | number               |
| onSelectedDate | (date: Date) => void |
| initialDate    | Date                 |
