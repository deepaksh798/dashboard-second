"use client";

import React, { useEffect, useState } from "react";
import CreateNewAssistant from "@/components/CreateNewAssistant";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LuPlus } from "react-icons/lu";
import { Icon } from "@iconify/react";
import ChatDialog from "@/components/ChatDialog";
import { useAppSelector } from "@/lib/Redux/Hook/hook";

const Assistants = () => {
  const assistants = useAppSelector((state) => state.userData.assistants);

  const [openForm, setOpenForm] = useState(false);
  const [cardData, setCardData] = useState<any[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentAssistant, setCurrentAssistant] = useState<any | null>(null);

  const defaultAssistants = [
    {
      image: "",
      name: "Rajat Saraswat",
      // yourAgent: "Developer",
      voice: "emily",
    },
    {
      image: "",
      name: "Deepak Mishra",
      // yourAgent: "Developer",
      voice: "james",
    },
  ];

  // Sync Redux store data with state
  useEffect(() => {
    setCardData([...defaultAssistants, ...assistants]);
  }, [assistants]);

  // Handle form submission
  const handleCreateAssistant = () => {
    setOpenForm(false);
  };

  // Handle test call
  const handleStartCall = (assistant: any) => {
    console.log("handleStopCall", assistant);
    setCurrentAssistant(assistant);
    setOpenDialog(true);
  };

  return (
    <div className="h-full">
      {openForm ? (
        <CreateNewAssistant
          onSubmit={handleCreateAssistant}
          onCancel={() => setOpenForm(false)}
        />
      ) : (
        <div className="h-full py-7 px-7 bg-[#F0FBF1]">
          <div className="flex items-center justify-between pb-8">
            <h1 className="text-2xl font-semibold ">Assistants</h1>
            <Button className="flex" onClick={() => setOpenForm(true)}>
              <LuPlus />
              Create New
            </Button>
          </div>
          <div className="h-full bg-white p-8 rounded-md">
            <div className="flex flex-wrap gap-6">
              {cardData.map((assistant: any, index: number) => (
                <div
                  key={index}
                  className="w-[260px] h-auto border border-[#0B322926] p-5 space-y-9 rounded-lg"
                >
                  <div className="flex flex-col items-center gap-4">
                    {/* Assistant Image or Initials */}
                    <div className="h-16 w-16 border-[2px] border-[#0B322926] flex items-center justify-center text-xl text-[#0B3229] font-bold rounded-lg overflow-hidden">
                      {assistant.image ? (
                        <Image
                          src={assistant.image} // ✅ Uses Base64 image directly
                          height={64}
                          width={64}
                          alt={assistant.name || "Assistant"}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <span>
                          {assistant.name
                            ?.split(" ")
                            .map((word: string) => word[0])
                            .join("")
                            .toUpperCase()}
                        </span>
                      )}
                    </div>

                    {/* Assistant Name & Role */}
                    <div className="flex flex-col items-center gap-1">
                      <h2 className="text-xl font-medium">{assistant.name}</h2>
                      <span className="text-sm font-medium text-[#666666]">
                        {assistant.yourAgent}
                      </span>
                    </div>
                  </div>

                  {/* Controls: Voice & Test Call */}
                  <div className="flex flex-col gap-4 ">
                    <div className="flex justify-center bg-[#F0FBF1] hover:bg-[#bff3c4] items-center rounded-md gap-2 h-9 cursor-pointer">
                      <Icon
                        icon="material-symbols:sound-sampler-rounded"
                        width="24"
                        height="24"
                      />
                      <span>{assistant.voice}</span>
                    </div>
                    <Button
                      className="h-9"
                      onClick={() => handleStartCall(assistant)}
                    >
                      Test Call
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Dialog for Assistant */}
          {currentAssistant && (
            <ChatDialog
              open={openDialog}
              onClose={() => setOpenDialog(false)}
              assistant={currentAssistant}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Assistants;
