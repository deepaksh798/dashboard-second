"use client";

import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import vapi from "@/lib/vapi";
import { Icon } from "@iconify/react/dist/iconify.js";
import Lottie from "react-lottie";
import animationData from "../../public/lottie.json";
import { useAppDispatch } from "@/lib/Redux/Hook/hook";
import { fetchUserData } from "@/lib/Redux/Slice/vapiDataSlice";

interface ChatDialogProps {
  open: boolean;
  onClose: () => void;
  assistant: { name: string; id: string };
}

const ChatDialog: React.FC<ChatDialogProps> = ({
  open,
  onClose,
  assistant,
}) => {
  const [callStatus, setCallStatus] = useState("Disconnected");
  const [isSpeaking, setIsSpeaking] = useState(false); // State to control Lottie animation
  const [callMute, setCallMute] = useState(true);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (open) {
      handleStartCall();
    }
  }, [open]);

  // Handle Start call
  const handleStartCall = async () => {
    try {
      setCallStatus("Connecting...");
      vapi.start("b091c4fe-079e-479c-83a6-89a3fad5fac4");
      setCallStatus("Connected");

      vapi.on("call-start", () => setCallStatus("Call Started"));
      vapi.on("speech-start", () => {
        setIsSpeaking(true);
      });
      vapi.on("speech-end", () => {
        setIsSpeaking(false);
      });
      vapi.on("call-end", () => setCallStatus("Call Ended"));
      vapi.on("message", (message) => {
        console.log("Received message from VAPI:", message.transcript);
      });
      vapi.on("error", (e) => {
        console.error("VAPI Error:", e);
        setCallStatus("Error");
      });
    } catch (error) {
      console.error("Error starting VAPI call:", error);
      setCallStatus("Error");
    }
  };
  //Handle Stop Call
  const handleStopCall = () => {
    console.log("Stopping the call...");
    vapi.stop();
    dispatch(fetchUserData());
    setCallStatus("Disconnected");
    onClose();
  };

  // lottie animation
  const options = {
    loop: true,
    autoplay: false,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const handleCallMute = () => {
    const newMuteState = !callMute;
    setCallMute(newMuteState);
    if (newMuteState) {
      vapi.setMuted(false);
    } else {
      vapi.setMuted(true);
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => handleStopCall()}>
      <DialogContent className="bg-[#414141] border-none">
        <div className="flex flex-col items-center gap-4 h-full max-h-[500px]">
          <div className="flex flex-col items-center gap-2">
            <div className="w-[88px] h-20 bg-[#D7FE66] rounded-xl flex justify-center items-center">
              <Icon icon="solar:user-bold" width="34" height="34" />
            </div>
            <span className="text-[#D7FE66] font-normal flex items-center gap-2">
              {assistant?.name}
              <Icon icon="mynaui:play-waves-solid" width="24" height="24" />
            </span>
          </div>
          {/* call animation */}
          <div>
            <Lottie
              options={options}
              isStopped={!isSpeaking}
              isPaused={!isSpeaking}
              height={200}
              width={200}
            />
          </div>
          {/* call status */}
          <div
            className={`h-8 w-full max-w-[157px] border flex items-center gap-2 ${
              ["Call Started", "Connected"].includes(callStatus)
                ? "border-[#1FFF18] text-[#1FFF18]"
                : callStatus === "Connecting..."
                ? "border-[#FFD700] text-[#FFD700]"
                : ["Disconnected", "Error", "Call Ended"].includes(callStatus)
                ? "border-[#FF0000] text-[#FF0000]"
                : "border-[#FFFFFF] text-[#FFFFFF]"
            } rounded-full justify-center`}
          >
            <Icon icon="material-symbols:call" width="24" height="24" />
            {callStatus}
          </div>
          {/* calling options */}
          <div className="text-white w-full max-w-[278px] h-[60px] bg-[#585858] rounded-full flex items-center justify-evenly">
            <div
              className="bg-[#E08A00] h-[30px] w-[30px] rounded-full flex justify-center items-center cursor-pointer"
              onClick={() => handleCallMute()}
            >
              {true ? (
                <Icon icon="mingcute:volume-fill" width="12" height="12" />
              ) : (
                <Icon icon="streamline:volume-off" width="12" height="12" />
              )}
            </div>
            {/* <div className="h-[40px] w-[40px] bg-gradient-to-r from-[#666666] via-[#a5a4a4] to-[#666666] rounded-full flex justify-center items-center cursor-pointer">
              <Icon icon="material-symbols:mic" width="17" height="17" />
            </div> */}
            <div
              className="bg-[#EB0000] h-[30px] w-[30px] rounded-full flex justify-center items-center cursor-pointer"
              onClick={handleStopCall}
            >
              <Icon icon="maki:cross" width="12" height="12" />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatDialog;
