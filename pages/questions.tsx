import { NextPage } from "next";
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useEffect, useState } from "react";
import { useAuth } from "../components/useAuth";
import QuestionsCard, { QuestionFrom } from "../components/QuestionsCard";
import axios from "axios";
import { useRouter } from "next/dist/client/router";

const QuestionsPage: NextPage = () => {
  const [pageNo, setPageNo] = useState(0);
  const [questions, setQuestions] = useState<any>({});
  const [question, setQuestion] = useState<any>({});
  const router = useRouter();
  const { authToken, fetchedToken } = useAuth();

  useEffect(() => {
    if (!authToken && fetchedToken) {
      router.replace("/login");
    }
  }, [authToken, router]);

  const submitData = async () => {
    const requestedQuestions = Object.keys(questions).map((x) => ({
      question: questions[x].question,
      options: [
        { id: 1, value: questions[x].option1 },
        { id: 2, value: questions[x].option2 },
        { id: 3, value: questions[x].option3 },
        { id: 4, value: questions[x].option4 },
      ],
      correctAnswerId: parseInt(questions[x].correctAnswer, 10),
    }));
    try {
      const res = await axios.post("api/questions", requestedQuestions, {
        headers: {
          "content-type": "application/json",
          "x-auth-token": authToken || "",
        },
      });
    } catch (ex) {
      console.log(ex);
    }
  };

  const onSubmit = async (data: QuestionFrom) => {
    console.log({ [`question${pageNo}`]: data });
    if (pageNo < 5) {
      setPageNo(pageNo + 1);
      setQuestions({ ...questions, [`question${pageNo + 1}`]: data });
    } else {
      console.log(questions);
      await submitData();
    }
  };

  const onPrevious = () => {
    if (pageNo > 0) {
      setPageNo(pageNo - 1);
      setQuestion(questions[`question${pageNo}`]);
    }
  };
  return (
    <>
      <Navbar />
      <main className="p-pt-2">
        <QuestionsCard
          key={pageNo}
          submit={onSubmit}
          question={question}
          pageNo={pageNo}
          onPrevious={onPrevious}
        />
      </main>
      <Footer />
    </>
  );
};

export default QuestionsPage;
