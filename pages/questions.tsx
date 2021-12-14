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
  const { authToken } = useAuth();

  useEffect(() => {
    if (!authToken) {
      router.replace("/login");
    }
  }, [authToken, router]);

  const onSubmit = async (data: QuestionFrom) => {
    console.log({ [`question${pageNo}`]: data });
    if (pageNo < 10) {
      setPageNo(pageNo + 1);
      setQuestions({ ...questions, [`question${pageNo + 1}`]: data });
    } else {
      console.log(questions);
      const requestedQuestions = Object.keys(questions).map((x) => ({
        question: questions[x].question,
        options: [
          questions[x].option1,
          questions[x].option2,
          questions[x].option3,
          questions[x].option4,
        ],
        correctAnswerId: questions[x].correctAsnwer,
      }));
      try {
        const res = await axios.post("api/questions", requestedQuestions, {
          headers: {
            "Content-Type": "application/json",
            "X-Auth-Token": authToken || "",
          },
        });
      } catch (ex) {
        console.log(ex);
      }
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
