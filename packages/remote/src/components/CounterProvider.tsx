import React from "react";

interface CounterContextValue {
  counter: number;
  decrease: VoidFunction;
  increase: VoidFunction;
}

const CounterContext = React.createContext<CounterContextValue | null>(null);

export const CounterProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [counter, setCounter] = React.useState(0);

  const increase = () => setCounter((state) => state + 1);
  const decrease = () => setCounter((state) => state - 1);

  return (
    <CounterContext.Provider value={{ counter, increase, decrease }}>
      {children}
    </CounterContext.Provider>
  );
};

export const useCounter = () => {
  const context = React.useContext(CounterContext);

  if (!context) {
    throw new Error("CounterProvider not fount");
  }

  return context;
};
