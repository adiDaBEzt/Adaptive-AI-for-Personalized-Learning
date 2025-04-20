import React, { useState, useEffect } from "react";

// Add these type definitions
interface Option {
  id: string;
  text: string;
}

interface Question {
  id: number;
  type: string;
  text: string;
  options?: Option[];
  bloomsLevel: string;
  bloomsNumber: number;
}

interface AnswerMap {
  [questionId: number]: string;
}

const AssessmentPage = () => {
  // Update your state definitions with proper types
  const [currentQuestion, setCurrentQuestion] = useState<number>(1);
  const [selectedAnswers, setSelectedAnswers] = useState<AnswerMap>({});
  const [timeLeft, setTimeLeft] = useState<number>(15 * 60); // 15 minutes in seconds
  const [showTimerModal, setShowTimerModal] = useState<boolean>(false);

  // Questions data
  const questions: Question[] = [
    {
      id: 1,
      type: "Multiple Choice",
      text: "Which of the following is NOT a characteristic of a real-time operating system?",
      options: [
        { id: "a", text: "Predictable response time" },
        { id: "b", text: "Fast context switching" },
        { id: "c", text: "Large memory footprint" },
        { id: "d", text: "Deterministic behavior" },
      ],
      bloomsLevel: "Remember",
      bloomsNumber: 1,
    },
    {
      id: 2,
      type: "Multiple Choice",
      text: "Which operating system structuring method uses a layered approach where each layer relies only on the layers below it?",
      options: [
        { id: "a", text: "Microkernel" },
        { id: "b", text: "Monolithic kernel" },
        { id: "c", text: "Hybrid kernel" },
        { id: "d", text: "Exokernel" },
      ],
      bloomsLevel: "Understand",
      bloomsNumber: 2,
    },
    {
      id: 3,
      type: "Descriptive",
      text: "Describe the trade-offs between preemptive and non-preemptive scheduling algorithms. Provide examples of each type.",
      bloomsLevel: "Analyze",
      bloomsNumber: 4,
    },
    {
      id: 4,
      type: "Descriptive",
      text: "Compare and contrast the impact of security considerations on the design of operating systems for embedded systems versus cloud-based systems.",
      bloomsLevel: "Evaluate",
      bloomsNumber: 5,
    },
    {
      id: 5,
      type: "Descriptive",
      text: "Given the deadlock situation in the diagram where Process P1 holds Resource R2 and waits for R1, while Process P2 holds R1 and waits for R2, can you apply a suitable deadlock recovery method to resolve this issue? Describe the steps you would take.",
      bloomsLevel: "Create",
      bloomsNumber: 6,
    },
    {
      id: 6,
      type: "Descriptive",
      text: "Explain how Deadlock can occur and describe the four necessary conditions for a deadlock to happen and what measures can be taken to prevent deadlocks.",
      bloomsLevel: "Apply",
      bloomsNumber: 3,
    },
  ];

  // Timer effect
  useEffect(() => {
    if (timeLeft <= 0) {
      setShowTimerModal(true);
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft]);

  // Format time from seconds to MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Handle option selection for MCQs
  const handleOptionSelect = (questionId: number, optionId: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: optionId,
    });
  };

  // Handle next question
  const handleNextQuestion = () => {
    if (currentQuestion < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  // Handle previous question
  const handlePrevQuestion = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  // Get current question
  const question = questions.find((q) => q.id === currentQuestion);

  // Count unanswered questions
  const unansweredCount =
    questions.length - Object.keys(selectedAnswers).length;

  return (
    <div>
      {/* Main content */}
      <div style={{ padding: "16px" }}>
        <h1
          style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}
        >
          Operating Systems Assessment
        </h1>

        {/* Timer and Progress */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <div>
            Progress: {Object.keys(selectedAnswers).length}/{questions.length}{" "}
            questions answered
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor:
                timeLeft < 60
                  ? "#fee2e2"
                  : timeLeft < 300
                  ? "#fef3c7"
                  : "#f3f4f6",
              padding: "8px 16px",
              borderRadius: "8px",
              transition: "background-color 0.5s ease",
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                fontWeight: "bold",
                fontSize: "20px",
                color:
                  timeLeft < 60
                    ? "#ef4444"
                    : timeLeft < 300
                    ? "#f59e0b"
                    : "#374151",
              }}
            >
              ⏱ {formatTime(timeLeft)}
            </span>
          </div>
        </div>

        {/* Flex container for sidebar and main content */}
        <div style={{ display: "flex", gap: "24px", marginBottom: "24px" }}>
          {/* Question Sidebar */}
          <div
            style={{
              width: "240px",
              flexShrink: 0,
              border: "1px solid #e5e7eb",
              borderRadius: "4px",
            }}
          >
            <div
              style={{
                padding: "12px",
                borderBottom: "1px solid #e5e7eb",
                fontWeight: "bold",
              }}
            >
              Questions
            </div>
            <div>
              {questions.map((q) => (
                <button
                  key={q.id}
                  onClick={() => setCurrentQuestion(q.id)}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "12px",
                    borderBottom: "1px solid #e5e7eb",
                    background:
                      currentQuestion === q.id ? "#e0e7ff" : "transparent",
                    display: "block",
                    cursor: "pointer",
                    border: "none",
                    borderLeft:
                      currentQuestion === q.id ? "4px solid #6366f1" : "none",
                  }}
                >
                  <div style={{ fontWeight: "bold", marginBottom: "4px" }}>
                    {q.id} - {q.type}
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {q.text.length > 60
                      ? q.text.substring(0, 60) + "..."
                      : q.text}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Main Content Area */}
          <div style={{ flex: "1" }}>
            {/* Current Question */}
            {question && (
              <div>
                <h2
                  style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    marginBottom: "8px",
                  }}
                >
                  Question {question.id}
                </h2>

                {/* Bloom's Level */}
                <div
                  style={{
                    backgroundColor: "#eff6ff",
                    padding: "8px",
                    marginBottom: "16px",
                    borderRadius: "4px",
                  }}
                >
                  Bloom's Level: {question.bloomsLevel} ({question.bloomsNumber}
                  /6)
                </div>

                {/* Question Text */}
                <p style={{ marginBottom: "16px" }}>{question.text}</p>

                {/* Question 5 deadlock image */}
                {question.id === 5 && (
                  <div style={{ marginBottom: "20px", textAlign: "center" }}>
                    <div
                      style={{
                        border: "1px solid #e5e7eb",
                        borderRadius: "4px",
                        padding: "10px",
                        backgroundColor: "#f9fafb",
                        display: "inline-block",
                      }}
                    >
                      <img
                        src="/images/img.png"
                        alt="img"
                        style={{
                          maxWidth: "100%",
                          maxHeight: "400px",
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Multiple Choice Options */}
                {question.type === "Multiple Choice" && question.options && (
                  <div style={{ marginBottom: "24px" }}>
                    {question.options.map((option) => (
                      <div
                        key={option.id}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: "8px",
                        }}
                      >
                        <input
                          type="checkbox"
                          id={`question${question.id}_option${option.id}`}
                          checked={selectedAnswers[question.id] === option.id}
                          onChange={() =>
                            handleOptionSelect(question.id, option.id)
                          }
                          style={{ marginRight: "8px" }}
                        />
                        <label
                          htmlFor={`question${question.id}_option${option.id}`}
                        >
                          {option.id}) {option.text}
                        </label>
                      </div>
                    ))}
                  </div>
                )}

                {/* Descriptive Question */}
                {question.type === "Descriptive" && (
                  <textarea
                    rows={6}
                    style={{
                      width: "100%",
                      padding: "8px",
                      border: "1px solid #d1d5db",
                      borderRadius: "4px",
                      marginBottom: "24px",
                    }}
                    placeholder="Type your answer here..."
                  />
                )}

                {/* Upload Question */}
                {question.type === "Upload" && (
                  <div
                    style={{
                      border: "1px solid #d1d5db",
                      borderRadius: "4px",
                      padding: "16px",
                      marginBottom: "24px",
                      textAlign: "center",
                    }}
                  >
                    <button
                      style={{
                        padding: "8px 16px",
                        background: "#6366f1",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      Upload File
                    </button>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "24px",
                  }}
                >
                  <button
                    onClick={handlePrevQuestion}
                    disabled={currentQuestion === 1}
                    style={{
                      padding: "8px 16px",
                      background: currentQuestion === 1 ? "#f3f4f6" : "#e0e7ff",
                      border: "1px solid #d1d5db",
                      borderRadius: "4px",
                      cursor: currentQuestion === 1 ? "not-allowed" : "pointer",
                    }}
                  >
                    ← Previous
                  </button>
                  <button
                    onClick={handleNextQuestion}
                    disabled={currentQuestion === questions.length}
                    style={{
                      padding: "8px 16px",
                      background:
                        currentQuestion === questions.length
                          ? "#f3f4f6"
                          : "#e0e7ff",
                      border: "1px solid #d1d5db",
                      borderRadius: "4px",
                      cursor:
                        currentQuestion === questions.length
                          ? "not-allowed"
                          : "pointer",
                    }}
                  >
                    Next →
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Assessment Footer */}
        <div
          style={{
            borderTop: "1px solid #e5e7eb",
            paddingTop: "16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>{unansweredCount} questions unanswered</div>
          <button
            style={{
              padding: "8px 16px",
              background: "#6366f1",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Submit Assessment
          </button>
        </div>
      </div>

      {/* Time's Up Modal */}
      {showTimerModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 50,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "32px",
              borderRadius: "8px",
              maxWidth: "400px",
              textAlign: "center",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h2
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                marginBottom: "16px",
              }}
            >
              Time's Up!
            </h2>
            <p style={{ marginBottom: "24px" }}>
              Your assessment time has ended. All your answers have been
              automatically submitted.
            </p>
            <button
              onClick={() => setShowTimerModal(false)}
              style={{
                padding: "10px 20px",
                backgroundColor: "#6366f1",
                color: "white",
                borderRadius: "4px",
                border: "none",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              View Results
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssessmentPage;
