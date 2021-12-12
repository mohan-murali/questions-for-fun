import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { RadioButton } from "primereact/radiobutton";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

interface QuestionsCardProps {
  pageNo: number;
  question?: any;
  onPrevious: () => void;
  submit: (data: QuestionFrom) => void;
}

export interface QuestionFrom {
  quesiton: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  correctAnswer: string;
}

const nextFormSchema = yup.object().shape({
  question: yup.string().trim().required().min(10),
  option1: yup.string().trim().required(),
  option2: yup.string().trim().required(),
  option3: yup.string().trim().required(),
  option4: yup.string().trim().required(),
  correctAnswer: yup.string().required(),
});

const QuestionsCard: React.FC<QuestionsCardProps> = ({
  pageNo,
  question,
  onPrevious,
  submit,
}) => {
  const {
    handleSubmit,
    register,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(nextFormSchema),
  });

  const onSubmit = (data: QuestionFrom) => {
    submit(data);
  };

  const resetFormDetail = (detail?: QuestionFrom) => {
    if (detail) {
      const parsedDetail: any = {
        ...detail,
      };

      Object.keys(parsedDetail).forEach((k) => {
        if (parsedDetail[k]) {
          setValue(k, (parsedDetail as any)[k], {
            shouldDirty: true,
          });
        }
      });
    }
  };

  useEffect(() => {
    console.log(question, pageNo);
    if (question) {
      resetFormDetail(question);
    }
  }, [question, resetFormDetail]);

  return (
    <Card className="card-questions-form">
      <form
        className="p-d-flex p-flex-column p-jc-between"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="p-fluid p-formgrid p-grid">
          <div className="p-field p-col-12">
            <label htmlFor="question">Enter the Question</label>
            <InputTextarea id="question" rows={4} {...register("question")} />
            {errors?.question && (
              <small id="question-help" className="p-error p-d-block">
                {" "}
                you must specify a question with atleast 10 characters
              </small>
            )}
          </div>
          <div className="p-field p-col-12 p-md-6">
            <label htmlFor="option1">Enter 1st Option</label>
            <InputText id="option1" type="text" {...register("option1")} />
            {errors?.option1 && (
              <small id="option1-help" className="p-error p-d-block">
                options are required
              </small>
            )}
          </div>
          <div className="p-field p-col-12 p-md-6">
            <label htmlFor="option2">Enter 2nd Option</label>
            <InputText id="option2" type="text" {...register("option2")} />
            {errors?.option2 && (
              <small id="option2-help" className="p-error p-d-block">
                options are required
              </small>
            )}
          </div>
          <div className="p-field p-col-12 p-md-6">
            <label htmlFor="option3">Enter 3rd Option</label>
            <InputText id="option3" type="text" {...register("option3")} />
            {errors?.option3 && (
              <small id="option3-help" className="p-error p-d-block">
                options are required
              </small>
            )}
          </div>
          <div className="p-field p-col-12 p-md-6">
            <label htmlFor="option4">Enter 4rth Option</label>
            <InputText id="option4" type="text" {...register("option4")} />
            {errors?.option4 && (
              <small id="option4-help" className="p-error p-d-block">
                options are required
              </small>
            )}
          </div>
          <div className="p-pl-3">
            <label className="p-d-block p-my-3">Select the right answer</label>
            <Controller
              name="correctAnswer"
              control={control}
              render={({ field: { value, onChange } }) => (
                <div className="p-formgroup-inline">
                  <div className="p-field-checkbox">
                    <RadioButton
                      inputId="option1"
                      name="option1"
                      value="1"
                      onChange={(e) => onChange(e.value)}
                      checked={value === "1"}
                    />
                    <label htmlFor="option1">1st Option</label>
                  </div>
                  <div className="p-field-checkbox">
                    <RadioButton
                      inputId="option2"
                      name="option2"
                      value="2"
                      onChange={(e) => onChange(e.value)}
                      checked={value === "2"}
                    />
                    <label htmlFor="option2">2nd Option</label>
                  </div>
                  <div className="p-field-checkbox">
                    <RadioButton
                      inputId="option3"
                      name="option3"
                      value="3"
                      onChange={(e) => onChange(e.value)}
                      checked={value === "3"}
                    />
                    <label htmlFor="option3">3rd Option</label>
                  </div>
                  <div className="p-field-checkbox">
                    <RadioButton
                      inputId="option4"
                      name="option4"
                      value="4"
                      onChange={(e) => onChange(e.value)}
                      checked={value === "4"}
                    />
                    <label htmlFor="option4">4rth Option</label>
                  </div>
                </div>
              )}
            />
            {errors?.correctAnswer && (
              <small id="correct-answer-help" className="p-error p-d-block">
                you must select a correct answer
              </small>
            )}
          </div>
        </div>
        <div className="p-d-flex p-jc-center p-flex-wrap">
          <Button type="submit" label="Next" className="p-mt-2 p-mr-2 p-sm-4" />
          <Button
            type="button"
            label="Back"
            disabled={pageNo < 1}
            onClick={onPrevious}
            className="p-mt-2 p-sm-4 p-button-outlined p-button-secondary"
          />
        </div>
      </form>
    </Card>
  );
};

export default QuestionsCard;
