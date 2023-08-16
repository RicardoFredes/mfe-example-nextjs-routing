import DOMCommunicator from "dom-communicator";
import React from "react";

export const CommunicatorProvider = ({ children }: { children: React.ReactNode }) => {
  React.useEffect(() => {
    const communicator = DOMCommunicator.getInstance();

    const requestLogin = () => {
      communicator.publish("response:login", { accessToken: "fakeAccessToken" });
    };

    communicator.subscribe("request:login", requestLogin);
    communicator.subscribe("request:callback", ({ callback }: any) => {
      callback?.();
    });

    return () => communicator.destroy();
  }, []);

  return children;
};
