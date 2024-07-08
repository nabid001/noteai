"use client";
import React, { useState, Dispatch, SetStateAction } from "react";
import { Button } from "../../ui/button";
import Image from "next/image";

type VoiceProps = {
  onChangeValue: (...event: any[]) => void;
  value: string;
  setQuestions: Dispatch<SetStateAction<string | undefined>>;
  setAnswers: Dispatch<SetStateAction<string | undefined>>;
  questions: string | undefined;
  answers: string | undefined;
};

const Voice = ({
  onChangeValue,
  value,
  setQuestions,
  setAnswers,
  questions,
  answers,
}: VoiceProps) => {
  const [language, setLanguage] = useState<"en-US" | "bn-BD">("en-US");

  const handleRecord = (e: any) => {
    e.preventDefault();

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();

    // Set language based on toggle state
    recognition.lang = language;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onChangeValue(transcript);

      if (
        transcript.toLowerCase().startsWith("question") ||
        transcript.startsWith("প্রশ্ন")
      ) {
        const question =
          transcript.replace(/^(question|প্রশ্ন)\s*/i, "").trim() + "?";
        setQuestions(question);
      } else if (
        transcript.toLowerCase().startsWith("answer") ||
        transcript.startsWith("উত্তর")
      ) {
        const answer =
          transcript.replace(/^(answer|উত্তর)\s*/i, "").trim() + ".";
        setAnswers(answer);
      }
    };

    recognition.start();
  };

  const handleClear = (e: any) => {
    e.preventDefault();

    setQuestions("");
    setAnswers("");
  };

  const toggleLanguage = (e: any) => {
    e.preventDefault();

    setLanguage((prevLanguage) =>
      prevLanguage === "en-US" ? "bn-BD" : "en-US"
    );
  };

  return (
    <>
      <div className="flex flex-col items-center gap-3">
        <Image
          src="/assets/images/microphone-solid.svg"
          width={85}
          height={85}
          alt="Microphone"
          onClick={handleRecord}
          className="origin-center cursor-pointer object-contain "
        />
        <div className="flex flex-col gap-2">
          <Button size="sm" variant="outline" onClick={toggleLanguage}>
            Change to {language === "en-US" ? "Bangla" : "English"}
          </Button>
          <Button
            size="sm"
            className="mx-auto w-fit"
            variant="destructive"
            onClick={handleClear}
          >
            Clear
          </Button>
        </div>
      </div>
      <div className="flex min-w-[90%] flex-col gap-3">
        <h2 className="text-base font-semibold text-black/85">QA Pairs:</h2>
        {questions && <p className="text-[18px] ">Q: {questions}</p>}
        {answers && <p className="text-[18px]">A: {answers}</p>}
      </div>
    </>
  );
};

export default Voice;
