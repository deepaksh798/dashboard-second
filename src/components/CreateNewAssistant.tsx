"use client";

import React, { useState } from "react";
import { FaAngleLeft } from "react-icons/fa6";
import { MdOutlineSlowMotionVideo } from "react-icons/md";
import { TiArrowRight } from "react-icons/ti";
import { useFormik } from "formik";
import { Label } from "@/components/ui/label";
import { assistantSchema } from "@/lib/validationSchema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useAppDispatch } from "@/lib/Redux/Hook/hook";
import { createAssistant } from "@/lib/Redux/Slice/userDataSlice";
import { Icon } from "@iconify/react/dist/iconify.js";

type Props = {
  onSubmit: () => void;
  onCancel: () => void;
};

const CreateNewAssistant = ({ onSubmit, onCancel }: Props) => {
  const [imagePreview, setImagePreview] = useState<any | null>(null);

  const dispatch = useAppDispatch();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result as string;
        setImagePreview(base64Image);
        formik.setFieldValue("image", base64Image); // Store Base64 in Formik state
      };
      reader.readAsDataURL(file);
    }
  };

  const formik = useFormik<any>({
    initialValues: {
      image: null,
      name: "",
      yourAgent: "",
      knowledgeBase: "",
      language: "english",
      voice: "michael",
      greetings: "",
      farewell: "",
    },
    validationSchema: assistantSchema,
    onSubmit: (values) => {
      // console.log("Form Data:", values);
      const assistentData = {
        image: values.image,
        name: values.name,
        your_agent: values.yourAgent,
        description: values.knowledgeBase,
        language: values.language,
        voice: values.voice,
        first_message: values.greetings,
        end_call_message: values.farewell,
      };
      console.log("data assistentData", assistentData);
      dispatch(createAssistant(assistentData));
      // onSubmit(values);
      onSubmit();
      formik.resetForm;
    },
  });

  const voices = [
    {
      label: "Michael",
      value: "michael",
      bgImg:
        "https://images.unsplash.com/photo-1615109398623-88346a601842?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      label: "James",
      value: "james",
      bgImg:
        "https://images.unsplash.com/photo-1727990474915-4e7d5d7a2187?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      label: "Emily",
      value: "emily",
      bgImg:
        "https://images.unsplash.com/photo-1529232356377-57971f020a94?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      label: "David",
      value: "david",
      bgImg:
        "https://images.unsplash.com/photo-1707055817568-5a20272eda6c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      label: "Sarah",
      value: "sarah",
      bgImg:
        "https://images.unsplash.com/photo-1551989745-347c28b620e5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      label: "William",
      value: "william",
      bgImg:
        "https://images.unsplash.com/photo-1707971625687-a023eb07580e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      label: "Olivia",
      value: "olivia",
      bgImg:
        "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      label: "Daniel",
      value: "daniel",
      bgImg:
        "https://images.unsplash.com/photo-1685656304178-41369e4f6db1?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col h-full w-full pt-7 px-7 bg-[#F0FBF1]"
    >
      <div className="flex justify-between max-w-7xl">
        <h1 className="text-2xl font-semibold flex items-center gap-1 mb-9">
          <FaAngleLeft onClick={onCancel} className="cursor-pointer" />
          Create New Assistant
        </h1>
        <Button type="submit" className="font-semibold rounded-md gap-2">
          Save
          <Icon icon="material-symbols:save-rounded" width="24" height="24" />
        </Button>
      </div>
      <div className="w-full h-full rounded-md bg-white pt-10 px-24 ">
        <div className="max-w-7xl space-y-6 pb-8">
          {/* Image and Text Inputs */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              {/* Image Box */}
              <div className="w-[200px] h-[200px] bg-white text-[#0B3229] border rounded-2xl flex items-center justify-center text-xl font-bold overflow-hidden">
                {formik.values.image ? (
                  <img
                    src={imagePreview}
                    alt="Selected"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <span>
                    {formik.values.name
                      ? formik.values.name
                          .split(" ")
                          .map((word: any | null) => word[0])
                          .join("")
                          .toUpperCase()
                      : "AN"}
                  </span>
                )}
              </div>
              {/* Hidden File Input */}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
            <div className="flex-1 space-y-4">
              <div className="space-y-4">
                <Label className="font-medium text-[16px]">Your Name</Label>
                <Input
                  type="text"
                  name="name"
                  placeholder="Assistant's Name"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  className=""
                />
                {formik.touched.name && formik.errors.name === "string" && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.name}
                  </div>
                )}
              </div>
              <div className="space-y-4">
                <Label className="font-medium text-[16px]">Your Agent</Label>
                <Input
                  type="text"
                  name="yourAgent"
                  placeholder="Your Agent"
                  onChange={formik.handleChange}
                  value={formik.values.occupation}
                  className=""
                />
                {formik.touched.occupation &&
                  formik.errors.occupation === "string" && (
                    <div className="text-red-500 text-sm">
                      {formik.errors.occupation}
                    </div>
                  )}
              </div>
            </div>
          </div>

          {/* Knowledge Base */}
          <div className="space-y-4">
            <Label className="font-medium text-[16px]">Description</Label>
            <textarea
              name="knowledgeBase"
              placeholder="Write your knowledge base here"
              onChange={formik.handleChange}
              value={formik.values.knowledgeBase}
              className="w-full border border-gray-300 rounded-md p-2 h-36"
            ></textarea>
          </div>

          {/* Language Selection */}
          <div className="space-y-4">
            <Label className="font-medium text-[16px]">Select Language</Label>
            <Select
              value={formik.values.language}
              onValueChange={(value) => formik.setFieldValue("language", value)}
            >
              <SelectTrigger className="w-full border border-gray-300 rounded-md p-6">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="german">German</SelectItem>
              </SelectContent>
            </Select>
            {formik.touched.language &&
              typeof formik.errors.language === "string" && (
                <div className="text-red-500 text-sm">
                  {formik.errors.language}
                </div>
              )}
          </div>

          {/* Voice Selection */}
          <div className="space-y-4">
            <Label className="font-medium text-[16px]">Select Voice</Label>
            <div className="flex flex-wrap gap-4">
              {voices.map((voice: any) => (
                <div
                  key={voice.value}
                  className="flex flex-col items-center gap-[9px]"
                >
                  <div
                    className={`relative flex items-center justify-center p-4 rounded-full overflow-hidden cursor-pointer w-16 h-16 ${
                      formik.values.voice === voice.value
                        ? "ring-4 ring-[#0B3229]"
                        : ""
                    }`}
                    onClick={() => formik.setFieldValue("voice", voice.value)}
                  >
                    {/* Wrapper for the image with the overlay */}
                    <div
                      className="absolute inset-0 bg-center bg-cover rounded-lg"
                      style={{
                        backgroundImage: `url('${voice.bgImg}')`,
                      }}
                    >
                      <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg"></div>
                    </div>
                    {/* Icon above the image */}
                    <MdOutlineSlowMotionVideo className="relative z-10 h-8 w-8 text-white" />
                  </div>
                  <span className="text-sm font-medium">{voice.label}</span>
                </div>
              ))}
            </div>

            {formik.touched.voice &&
              typeof formik.errors.voice === "string" && (
                <div className="text-red-500 text-sm">
                  {formik.errors.voice}
                </div>
              )}
          </div>

          {/* Text Inputs */}
          <div className="space-y-4">
            <Label className="font-medium text-[16px]">
              Greetings - Starting Words
            </Label>
            <Input
              type="text"
              name="greetings"
              placeholder="Enter text here"
              onChange={formik.handleChange}
              value={formik.values.greetings}
            />
          </div>
          <div className="space-y-4">
            <Label className="font-medium text-[16px]">
              Word for Farewell - Ending Words
            </Label>
            <Input
              type="text"
              name="farewell"
              placeholder="Enter text here"
              onChange={formik.handleChange}
              value={formik.values.farewell}
            />
          </div>

          {/* Save Button */}
        </div>
      </div>
      <div className="text-right"></div>
    </form>
  );
};

export default CreateNewAssistant;
