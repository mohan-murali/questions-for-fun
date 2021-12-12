import { NextPage } from "next";
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useState } from "react";
import QuestionsCard, { QuestionFrom } from "../components/QuestionsCard";

const QuestionsPage: NextPage = () => {
  const [pageNo, setPageNo] = useState(0);
  const [questions, setQuestions] = useState<any>([]);

  const onSubmit = (data: QuestionFrom) => {
    console.log({ [`question${pageNo}`]: data });
    if (pageNo < 10) {
      setPageNo(pageNo + 1);
      setQuestions([...questions, data]);
    } else {
      console.log(questions);
    }
  };

  const onPrevious = () => {
    if (pageNo > 0) {
      setPageNo(pageNo - 1);
    }
  };
  return (
    <>
      <Navbar />
      <main className="p-pt-2">
        <QuestionsCard
          key={pageNo}
          submit={onSubmit}
          question={questions[pageNo]}
          pageNo={pageNo}
          onPrevious={onPrevious}
        />
      </main>
      <Footer />
    </>
  );
};

export default QuestionsPage;
