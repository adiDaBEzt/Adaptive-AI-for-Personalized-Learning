import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  LineChart,
  Line,
} from "recharts";

const EvaluationReportPage = () => {
  // Current evaluation data based on the report
  const currentScores = [
    { name: "Remembering (Q1)", level: 1, score: 2, maxScore: 6 },
    { name: "Understanding (Q2)", level: 2, score: 2, maxScore: 6 },
    { name: "Applying (Q6)", level: 3, score: 5, maxScore: 6 },
    { name: "Analyzing (Q3)", level: 4, score: 5, maxScore: 6 },
    { name: "Evaluating (Q4)", level: 5, score: 6, maxScore: 6 },
    { name: "Creating (Q5)", level: 6, score: 6, maxScore: 6 },
  ];

  // Previous performance data (assumed worse as requested)
  const previousScores = [
    { name: "Remembering", level: 1, score: 0, maxScore: 6 },
    { name: "Understanding", level: 2, score: 1, maxScore: 6 },
    { name: "Applying", level: 3, score: 3, maxScore: 6 },
    { name: "Analyzing", level: 4, score: 3, maxScore: 6 },
    { name: "Evaluating", level: 5, score: 4, maxScore: 6 },
    { name: "Creating", level: 6, score: 3, maxScore: 6 },
  ];

  // Combined data for comparison chart
  const comparisonData = currentScores.map((item, index) => ({
    name: item.name.split(" ")[0], // Just use the cognitive level name
    current: (item.score / item.maxScore) * 100,
    previous:
      (previousScores[index].score / previousScores[index].maxScore) * 100,
  }));

  // Data for improvement potential chart
  const improvementData = currentScores.map((item) => ({
    name: item.name.split(" ")[0],
    achieved: (item.score / item.maxScore) * 100,
    potential: 100 - (item.score / item.maxScore) * 100,
  }));

  // Calculate overall score
  const overallScore =
    (currentScores.reduce((sum, item) => sum + item.score, 0) /
      currentScores.reduce((sum, item) => sum + item.maxScore, 0)) *
    100;
  const previousOverallScore =
    (previousScores.reduce((sum, item) => sum + item.score, 0) /
      previousScores.reduce((sum, item) => sum + item.maxScore, 0)) *
    100;
  const improvementPercentage = overallScore - previousOverallScore;

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ color: "#4f46e5", marginBottom: "24px" }}>
        Student Evaluation Report
      </h1>

      {/* Score summary */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "32px",
          backgroundColor: "#f9fafb",
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        <div>
          <h2 style={{ fontSize: "18px", marginBottom: "8px" }}>
            Overall Performance
          </h2>
          <div
            style={{ fontSize: "36px", fontWeight: "bold", color: "#4f46e5" }}
          >
            {overallScore.toFixed(1)}%
          </div>
          <div
            style={{
              color: improvementPercentage > 0 ? "#10b981" : "#ef4444",
              display: "flex",
              alignItems: "center",
              marginTop: "8px",
            }}
          >
            {improvementPercentage > 0 ? "↑" : "↓"}{" "}
            {Math.abs(improvementPercentage).toFixed(1)}% from previous
          </div>
        </div>

        <div>
          <h2 style={{ fontSize: "18px", marginBottom: "8px" }}>
            Bloom's Level
          </h2>
          <div
            style={{ fontSize: "36px", fontWeight: "bold", color: "#4f46e5" }}
          >
            4.7/6.0
          </div>
          <div style={{ color: "#6b7280", marginTop: "8px" }}>
            Strong in higher cognitive skills
          </div>
        </div>

        <div>
          <h2 style={{ fontSize: "18px", marginBottom: "8px" }}>
            Improvement Areas
          </h2>
          <div style={{ fontSize: "18px", color: "#6b7280" }}>
            <ul style={{ paddingLeft: "20px", margin: 0 }}>
              <li>Remembering</li>
              <li>Understanding</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Radar chart for cognitive levels */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "24px",
          marginBottom: "32px",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "8px",
            padding: "20px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          <h2 style={{ fontSize: "18px", marginBottom: "16px" }}>
            Cognitive Level Performance
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart outerRadius={90} data={currentScores}>
              <PolarGrid />
              <PolarAngleAxis dataKey="name" tick={{ fontSize: 12 }} />
              <PolarRadiusAxis angle={30} domain={[0, 7]} />
              <Radar
                name="Current Performance"
                dataKey="score"
                stroke="#4f46e5"
                fill="#4f46e5"
                fillOpacity={0.6}
              />
              <Tooltip />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div
          style={{
            backgroundColor: "white",
            borderRadius: "8px",
            padding: "20px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          }}
        >
          <h2 style={{ fontSize: "18px", marginBottom: "16px" }}>
            Performance Comparison
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip
                formatter={(value) => [`${Number(value).toFixed(1)}%`, "Score"]}
              />
              <Legend />
              <Bar
                dataKey="current"
                name="Current Performance"
                fill="#4f46e5"
              />
              <Bar
                dataKey="previous"
                name="Previous Performance"
                fill="#94a3b8"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Areas for improvement chart */}
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "20px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          marginBottom: "32px",
        }}
      >
        <h2 style={{ fontSize: "18px", marginBottom: "16px" }}>
          Improvement Opportunities
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={improvementData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" domain={[0, 100]} />
            <YAxis dataKey="name" type="category" width={100} />
            <Tooltip formatter={(value) => [`${Number(value).toFixed(1)}%`, "Score"]} />
            <Legend />
            <Bar
              dataKey="achieved"
              name="Achieved"
              stackId="a"
              fill="#4f46e5"
            />
            <Bar
              dataKey="potential"
              name="Room for Improvement"
              stackId="a"
              fill="#e5e7eb"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Detailed question results */}
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "20px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          marginBottom: "32px",
        }}
      >
        <h2 style={{ fontSize: "18px", marginBottom: "16px" }}>
          Question Analysis
        </h2>

        <div style={{ marginBottom: "24px" }}>
          <h3
            style={{
              fontSize: "16px",
              marginBottom: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span>
              Question 1: Which of the following is NOT a characteristic of a
              real-time operating system?
            </span>
            <span
              style={{
                backgroundColor: "#fee2e2",
                color: "#ef4444",
                padding: "2px 8px",
                borderRadius: "4px",
                fontWeight: "normal",
                fontSize: "14px",
              }}
            >
              1/6
            </span>
          </h3>
          <div style={{ marginBottom: "8px" }}>
            <strong>Cognitive Level:</strong> Level 1 - Remembering
          </div>
          <div style={{ marginBottom: "8px" }}>
            <strong>Student Answer:</strong> "b) Fast context switching."
          </div>
          <div style={{ marginBottom: "8px" }}>
            <strong>Correct Answer:</strong> "c) Large memory footprint."
          </div>
          <div style={{ marginBottom: "8px" }}>
            <strong>Evaluation:</strong> The student answer is incorrect,
            reflecting a gap in basic recall of operating system
            characteristics. This question required simple fact recall.
          </div>
          <div style={{ display: "flex", gap: "16px" }}>
            <div>
              <strong>Strengths:</strong> Attempted the question.
            </div>
            <div>
              <strong>Areas for Improvement:</strong> Focus on memorizing key
              characteristics of real-time operating systems.
            </div>
          </div>
        </div>

        <div style={{ marginBottom: "24px" }}>
          <h3
            style={{
              fontSize: "16px",
              marginBottom: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span>
              Question 2: Which operating system structuring method uses a
              layered approach where each layer relies only on the layers below
              it?
            </span>
            <span
              style={{
                backgroundColor: "#fef9c3",
                color: "#ca8a04",
                padding: "2px 8px",
                borderRadius: "4px",
                fontWeight: "normal",
                fontSize: "14px",
              }}
            >
              2/6
            </span>
          </h3>
          <div style={{ marginBottom: "8px" }}>
            <strong>Cognitive Level:</strong> Level 2 - Understanding
          </div>
          <div style={{ marginBottom: "8px" }}>
            <strong>Student Answer:</strong> "b) Monolithic kernel."
          </div>
          <div style={{ marginBottom: "8px" }}>
            <strong>Evaluation:</strong> The student demonstrated understanding
            of system structuring methods. However, monolithic kernels are not
            typically associated with this specific layering concept.
          </div>
          <div style={{ display: "flex", gap: "16px" }}>
            <div>
              <strong>Strengths:</strong> Accurately described the relationship
              between layers.
            </div>
            <div>
              <strong>Areas for Improvement:</strong> Clarify the distinction
              between monolithic and layered architectures.
            </div>
          </div>
        </div>

        <div style={{ marginBottom: "24px" }}>
          <h3
            style={{
              fontSize: "16px",
              marginBottom: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span>
              Question 3: Describe the trade-offs between preemptive and
              non-preemptive scheduling algorithms. Provide examples of each
              type.
            </span>
            <span
              style={{
                backgroundColor: "#dcfce7",
                color: "#16a34a",
                padding: "2px 8px",
                borderRadius: "4px",
                fontWeight: "normal",
                fontSize: "14px",
              }}
            >
              3/6
            </span>
          </h3>
          <div style={{ marginBottom: "8px" }}>
            <strong>Cognitive Level:</strong> Level 4 - Analyzing
          </div>
          <div style={{ marginBottom: "8px" }}>
            <strong>Student Answer:</strong> Explained differences with
            examples.
          </div>
          <div style={{ marginBottom: "8px" }}>
            <strong>Evaluation:</strong> The student accurately analyzed and
            compared the algorithms with well-chosen examples.
          </div>
          <div style={{ display: "flex", gap: "16px" }}>
            <div>
              <strong>Strengths:</strong> Clear understanding of scheduling
              algorithms, providing a detailed comparison.
            </div>
            <div>
              <strong>Areas for Improvement:</strong> None evident in this
              response.
            </div>
          </div>
        </div>

        <div style={{ marginBottom: "24px" }}>
          <h3
            style={{
              fontSize: "16px",
              marginBottom: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span>
              Question 4: Compare and contrast the impact of security
              considerations on the design of operating systems for embedded
              systems versus cloud-based systems.
            </span>
            <span
              style={{
                backgroundColor: "#dcfce7",
                color: "#16a34a",
                padding: "2px 8px",
                borderRadius: "4px",
                fontWeight: "normal",
                fontSize: "14px",
              }}
            >
              4/6
            </span>
          </h3>
          <div style={{ marginBottom: "8px" }}>
            <strong>Cognitive Level:</strong> Level 5 - Evaluating
          </div>
          <div style={{ marginBottom: "8px" }}>
            <strong>Student Answer:</strong> Provided a comparison focusing on
            security aspects.
          </div>
          <div style={{ marginBottom: "8px" }}>
            <strong>Evaluation:</strong> The student effectively compared the
            security requirements, showing depth in evaluation and
            understanding.
          </div>
          <div style={{ display: "flex", gap: "16px" }}>
            <div>
              <strong>Strengths:</strong> Comprehensive assessment of security
              differences.
            </div>
            <div>
              <strong>Areas for Improvement:</strong> Include more specific
              examples of security technologies used.
            </div>
          </div>
        </div>

        <div style={{ marginBottom: "24px" }}>
          <h3
            style={{
              fontSize: "16px",
              marginBottom: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span>
              Question 5: Draw a diagram illustrating the different states a
              process can be in during process scheduling.
            </span>
            <span
              style={{
                backgroundColor: "#dcfce7",
                color: "#16a34a",
                padding: "2px 8px",
                borderRadius: "4px",
                fontWeight: "normal",
                fontSize: "14px",
              }}
            >
              6/6
            </span>
          </h3>
          <div style={{ marginBottom: "8px" }}>
            <strong>Cognitive Level:</strong> Level 6 - Creating
          </div>
          <div style={{ marginBottom: "8px" }}>
            <strong>Student Answer:</strong> Handwritten notes included states
            and transitions.
          </div>
          <div style={{ marginBottom: "8px" }}>
            <strong>Evaluation:</strong> The transcribed notes show
            understanding and creativity in outlining process states.
          </div>
          <div style={{ display: "flex", gap: "16px" }}>
            <div>
              <strong>Strengths:</strong> Creativity and clear illustration of
              process states.
            </div>
            <div>
              <strong>Areas for Improvement:</strong> Ensure diagrams are
              well-labeled for clarity.
            </div>
          </div>
        </div>

        <div style={{ marginBottom: "24px" }}>
          <h3
            style={{
              fontSize: "16px",
              marginBottom: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span>
              Question 6: Explain how Deadlock can occur and describe the four
              necessary conditions for a deadlock to happen and what measures
              can be taken to prevent deadlocks.
            </span>
            <span
              style={{
                backgroundColor: "#dcfce7",
                color: "#16a34a",
                padding: "2px 8px",
                borderRadius: "4px",
                fontWeight: "normal",
                fontSize: "14px",
              }}
            >
              5/6
            </span>
          </h3>
          <div style={{ marginBottom: "8px" }}>
            <strong>Cognitive Level:</strong> Level 3 - Applying
          </div>
          <div style={{ marginBottom: "8px" }}>
            <strong>Student Answer:</strong> Detailed explanation of deadlock
            conditions.
          </div>
          <div style={{ marginBottom: "8px" }}>
            <strong>Evaluation:</strong> Demonstrated a solid application of
            knowledge to explain and suggest measures for deadlock prevention.
          </div>
          <div style={{ display: "flex", gap: "16px" }}>
            <div>
              <strong>Strengths:</strong> In-depth understanding with detailed
              conditions and preventive measures.
            </div>
            <div>
              <strong>Areas for Improvement:</strong> None significant; strong
              response.
            </div>
          </div>
        </div>
      </div>

      {/* Overall recommendations */}
      <div
        style={{
          backgroundColor: "#f0f9ff",
          borderRadius: "8px",
          padding: "20px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        }}
      >
        <h2
          style={{ fontSize: "18px", marginBottom: "16px", color: "#0369a1" }}
        >
          Overall Assessment & Recommendations
        </h2>

        <div style={{ marginBottom: "16px" }}>
          <strong>Cognitive Level Engagement:</strong>
          <ul style={{ marginTop: "8px" }}>
            <li>
              <strong>Remembering:</strong> Weak engagement
            </li>
            <li>
              <strong>Understanding:</strong> Moderate engagement
            </li>
            <li>
              <strong>Applying:</strong> Strong engagement
            </li>
            <li>
              <strong>Analyzing:</strong> Very strong engagement
            </li>
            <li>
              <strong>Evaluating:</strong> Excellent engagement
            </li>
            <li>
              <strong>Creating:</strong> Excellent engagement
            </li>
          </ul>
        </div>

        <div style={{ marginBottom: "16px" }}>
          <strong>Overall Assessment:</strong> 4.8/6.0
        </div>

        <div>
          <strong>Recommendations for Improvement:</strong> Focus on improving
          memorization and understanding foundational concepts to strengthen the
          cognitive base at lower Bloom's levels.
          <p style={{ marginTop: "8px" }}>
            The student shows a strong grasp of higher-order cognitive
            processes, but could benefit from reinforcing basic knowledge and
            understanding layers for a comprehensive skill set across all
            Bloom's Taxonomy levels.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EvaluationReportPage;
