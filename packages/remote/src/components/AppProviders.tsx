import { CounterProvider } from "@/components/CounterProvider";
import { CommunicatorProvider } from "./Communicator";
import { Menu } from "./Menu";

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <CommunicatorProvider>
      <CounterProvider>
        <div style={{ border: "1px solid green", padding: 20 }}>
          <h2>Remote app</h2>
          <Menu />
          {children}
        </div>
      </CounterProvider>
    </CommunicatorProvider>
  );
};
