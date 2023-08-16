import { useCounter } from "./CounterProvider";

export const Counter = () => {
  const { counter, increase } = useCounter();
  return (
    <div>
      <div style={{ padding: 20, border: "1px solid gray" }}>{counter}</div>
      <br />
      <button onClick={increase}>Increase</button>
    </div>
  )
}
