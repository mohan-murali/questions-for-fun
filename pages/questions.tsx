import { NextPage } from "next";
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useState } from "react";
import QuestionsCard from "../components/QuestionsCard";

const QuestionsPage: NextPage = () => {
  const [pageNo, setPageNo] = useState(0);
  const [questions, setQuestions] = useState<any>({});

  const onSubmit = (data: any) => {
    console.log({ [`question${pageNo}`]: data });
    if (pageNo < 10) {
      setPageNo(pageNo + 1);
      setQuestions({ ...questions, [`question${pageNo + 1}`]: data });
    } else {
      console.log(questions);
    }
  };
  return (
    <>
      <Navbar />
      <main className="p-pt-2">
        <QuestionsCard key={pageNo} submit={onSubmit} />
      </main>
      <Footer />
    </>
  );
};

export default QuestionsPage;
