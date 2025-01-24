"use client";

import React, { useEffect, useState } from "react";
import CreateNewAssistant from "@/components/CreateNewAssistant";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LuPlus } from "react-icons/lu";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAppDispatch, useAppSelector } from "@/lib/Redux/Hook/hook";
import { fetchData } from "@/lib/Redux/Slice/cardDataSlice";
import ChatDialog from "@/components/ChatDialog";

const Assistants = () => {
  const [openForm, setOpenForm] = useState(false);
  const [cardData, setCardData] = useState<any[]>([
    {
      image: "",
      name: "Rajat Saraswat",
      yourAgent: "Developer",
      voice: "emily",
    },
    {
      image: "",
      name: "Deepak Mishra",
      yourAgent: "Developer",
      voice: "james",
    },
  ]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentAssistant, setCurrentAssistant] = useState<any>(null);
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.cardData);
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  // console.log("assistent --> ", cardData);

  const handleCreateAssistant = (newAssistant: any) => {
    setCardData((prev) => [...prev, newAssistant]);
    setOpenForm(false); // Close the form after submission
  };

  const handleStopCall = (assistant: any) => {
    setCurrentAssistant(assistant);
    setOpenDialog(true);
  };

  return (
    <div className="p-8">
      {openForm ? (
        <CreateNewAssistant
          onSubmit={handleCreateAssistant}
          onCancel={() => setOpenForm(false)}
        />
      ) : (
        <div>
          <div className="flex items-center justify-between mb-7">
            <h1 className="text-2xl font-semibold ">Assistants</h1>
            <Button className="flex h-11" onClick={() => setOpenForm(true)}>
              <LuPlus />
              Create New
            </Button>
          </div>
          <div className="flex flex-wrap gap-6">
            {data.map((assistant, index) => (
              <div
                key={index}
                className="w-[260px] h-auto border border-[#0B322926] p-5 space-y-9 rounded-lg"
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="h-16 w-16 border-[2px] border-[#0B322926] flex items-center justify-center text-xl text-[#0B3229] font-bold rounded-lg overflow-hidden">
                    {assistant.image ? (
                      <Image
                        src={URL.createObjectURL(assistant.image)}
                        height={64}
                        width={64}
                        alt={assistant.name || "Assistant"}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <span>
                        {assistant.name
                          ?.split(" ")
                          .map((word: any) => word[0])
                          .join("")
                          .toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <h2 className="text-xl font-medium">{assistant.name}</h2>
                    <span className="text-sm font-medium text-[#666666]">
                      {assistant.yourAgent}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-4 ">
                  <div className="flex justify-center bg-[#F0FBF1] hover:bg-[#bff3c4] items-center rounded-md gap-2 h-9 cursor-pointer">
                    <Icon
                      icon="material-symbols:sound-sampler-rounded"
                      width="24"
                      height="24"
                    />
                    <span>{assistant.voice}</span>
                  </div>
                  <Button className="h-9" onClick={handleStopCall}>
                    Test Call
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <ChatDialog
            open={openDialog}
            onClose={() => setOpenDialog(false)}
            assistant={currentAssistant}
          />
        </div>
      )}
    </div>
  );
};

export default Assistants;
