import DOMCommunicator from "dom-communicator";
import React from "react";

export const CommunicatorProvider = ({ children }: { children: React.ReactNode }) => {
  React.useEffect(() => {
    const communicator = DOMCommunicator.getInstance();

    communicator.subscribe("response:login", login);

    communicator.publish("request:login");
    communicator.publish("request:refresh-token");
    communicator.publish("request:callback", () => console.log("request-callback"));

    return () => {
      communicator.unsubscribe("login", login);
    };
  }, []);

  const login = (data: any) => {
    console.log("login success", data);
  };

  return children;
};
