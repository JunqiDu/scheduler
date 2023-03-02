import React, { useState } from 'react';

import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

import { action } from '@storybook/addon-actions/dist/preview';

export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  const reset = () => {
    setStudent("")
    setInterviewer(null)
  }

  function cancel() {
    reset();
    props.onCancel()
  }

  function validate() {
    if (student === "") {
      setError("Student name cannot be blank")
      return;
    }
    setError("")
    props.onSave(student, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name={props.name}
            type="text"
            onChange={(event) => setStudent(event.target.value)}
            value={interviewer}
            placeholder="student-name-input"
          />
          <section className="appointment__validation">{error}</section>
        </form>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={(event) => setInterviewer(event)}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onSubmit={event => event.preventDefault()} onClick={validate}>Save</Button>
        </section>
      </section>
    </main>
  )
}