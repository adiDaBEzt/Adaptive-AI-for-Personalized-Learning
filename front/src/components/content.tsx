import React, { useState } from "react";

const LearningContentPage = () => {
  const [currentSection, setCurrentSection] = useState(4);
  const [currentSubsection, setCurrentSubsection] = useState(4.2);
  const [expandedSections, setExpandedSections] = useState([4]);

  // Course content data
  const courseName = "Introduction to Operating Systems";
  const completedSections = 12;
  const totalSections = 20;

  const chapters = [
    {
      id: 1,
      title: "What is an Operating System?",
      completed: true,
      duration: "1 hour",
      expanded: false,
    },
    {
      id: 2,
      title: "Operating System Design Issues",
      completed: true,
      duration: "1.5 hours",
      expanded: false,
    },
    {
      id: 3,
      title: "Operating System Structures",
      completed: true,
      duration: "2 hours",
      expanded: false,
    },
    {
      id: 4,
      title: "Abstractions, Processes, and Resources",
      completed: false,
      duration: "2 hours",
      expanded: true,
      subsections: [
        { id: 4.1, title: "Abstraction", completed: true },
        { id: 4.2, title: "Processes", completed: false },
        { id: 4.3, title: "Resources", completed: false },
        { id: 4.4, title: "Deadlocks", completed: false },
      ],
    },
    {
      id: 5,
      title: "The Influence of Security, Networking, and Multimedia",
      completed: false,
      duration: "1.5 hours",
      expanded: false,
    },
  ];

  // Bloom's Taxonomy data
  const bloomsLevel = {
    level: "Evaluate",
    value: 5,
    maxValue: 6,
  };

  // Chapter content
  const chapterContent = {
    title: "Chapter 4: Abstractions, Processes, and Resources",
    learningObjectives:
      "In this chapter, you will gain a comprehensive understanding of the core concepts within an operating system, specifically focusing on abstraction, processes, resources, and deadlocks. By studying these mechanisms, you will learn how an operating system efficiently manages resources and process execution.",
    sections: [
      {
        title: "4.1 Abstraction",
        content: `
          <p>Abstraction within an operating system is the process of hiding the complex reality of hardware operations and providing user applications with a simplified interface. This simplification is crucial for efficiency and usability, as it allows the OS to present resources like files, processes, and memory in a manner that abstracts away the specifics of hardware interactions.</p>
          
          <h3>Definition and Importance</h3>
          <p>The fundamental purpose of abstraction is to create a layer where complex activities and data from the hardware layer are presented in a user-friendly manner. Abstraction is essential because it establishes a separation between different levels of hardware functionality and user interactions. As a result, programmers can develop applications without needing to understand the intricate operations of computer hardware.</p>
          
          <h3>Examples in Operating Systems</h3>
          <p>Operating systems leverage abstraction by implementing several key abstractions like files, processes, and memory. Filesystems allow data to be stored and organized effectively, while process abstraction allows the OS to manage multiple tasks simultaneously without interference. Memory management abstracts the complex task of allocation and deallocation of memory space during programmes' runtime.</p>
          
          <p>For example:</p>
          <ul>
            <li><strong>Filesystem Abstraction</strong>: Instead of directly interacting with raw storage devices, filesystems provide a logical view of storage consisting of files and directories.</li>
            <li><strong>Process Abstraction</strong>: The OS abstracts process handling by enabling multiple processes to run concurrently.</li>
            <li><strong>Memory Abstraction</strong>: Virtual memory abstracts the actual physical memory, allowing processes to use more memory than actually installed.</li>
          </ul>
          
          <h3>Resources and Practical Examples</h3>
          <p>To further understand abstraction, review the following resources:</p>
          <ul>
            <li><a href="https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-intro.pdf" target="_blank">The Abstraction: The Process</a></li>
            <li><a href="https://www.gchamirpur.org/wp-content/uploads/2023/07/Unit-I-Lecture-2-System-Software-and-Resource-Abstraction.pdf" target="_blank">Lecture: 2 System Software and Resource Abstraction</a></li>
          </ul>
          
          <img src="https://oaidalleapiprodscus.blob.core.windows.net/private/org-y8FuVyyLWmqXBCnIfKNmkrm5/user-RqKjnk1OKNHV2ljSIMJdsNEb/img-nHxo14EdImdH5Ox3EiD932LT.png?st=2025-04-13T05%3A15%3A42Z&se=2025-04-13T07%3A15%3A42Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=d505667d-d6c1-4a0a-bac7-5c84a87759f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-04-13T01%3A26%3A14Z&ske=2025-04-14T01%3A26%3A14Z&sks=b&skv=2024-08-04&sig=wSP6%2BgSXRZs%2BTJY7MuGNvcqX1bpz9uqwb8iHyRyuY/Q%3D" alt="Abstraction in Operating System" style="max-width: 100%; height: auto; margin: 20px 0;" />
        `,
      },
      {
        title: "4.2 Processes",
        content: `
          <p>Processes are fundamental units of execution within an operating system, enabling users to operate applications effectively. Understanding processes involves considering several aspects, such as process states, the process control block (PCB), scheduling, and context switching.</p>
          
          <h3>Process States</h3>
          <p>Processes undergo different states including ready, running, and blocked. Understanding the transitions between these states helps in identifying how the operating system schedules and manages processes:</p>
          
          <ol>
            <li><strong>Ready State</strong>: A process is in the ready state when it is prepared to execute as soon as it receives CPU time.</li>
            <li><strong>Running State</strong>: In this state, the process has been assigned CPU time and currently executes instructions.</li>
            <li><strong>Blocked State</strong>: A process enters a blocked state when it is waiting for some event, such as I/O operation completion.</li>
          </ol>
          
          <p>These states form a cycle dictating the life of a process, transitioning systematically based on system resources and scheduling.</p>
          
          <h3>Process Control Block (PCB)</h3>
          <p>The PCB acts as a data structure that contains critical information about the process's current state. It includes data such as process ID, process state, register contents, memory limits, and scheduling information. The OS uses this data to manage operations effectively as processes transition through different states.</p>
          
          <h3>Process Scheduling</h3>
          <p>Scheduling is a fundamental operating system function that manages process execution based on a scheduling algorithm. Common algorithms include:</p>
          <ul>
            <li><strong>First-Come, First-Served (FCFS)</strong>: Processes are attended in the sequence they arrive.</li>
            <li><strong>Shortest Job First (SJF)</strong>: Prioritizes processes with the shortest execution time.</li>
            <li><strong>Round Robin (RR)</strong>: Distributes CPU time across processes in equal time slices.</li>
          </ul>
          
          <h3>Context Switching</h3>
          <p>Context switching occurs when the OS saves the current state of a running process, allowing another process execution. It ensures multiprogramming, enhances performance, and enforces time-sharing.</p>
          
          <img src="https://oaidalleapiprodscus.blob.core.windows.net/private/org-y8FuVyyLWmqXBCnIfKNmkrm5/user-RqKjnk1OKNHV2ljSIMJdsNEb/img-Ty117oTEBjm0JVq723Q5Uzzp.png?st=2025-04-13T05%3A15%3A59Z&se=2025-04-13T07%3A15%3A59Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=d505667d-d6c1-4a0a-bac7-5c84a87759f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-04-12T16%3A02%3A15Z&ske=2025-04-13T16%3A02%3A15Z&sks=b&skv=2024-08-04&sig=3QXEmPDyG5mmImQ%2B7PVEf16zG0ih/4otbFYVHjNUf7Y%3D" alt="Process States in Operating System" style="max-width: 100%; height: auto; margin: 20px 0;" />
        `,
      },
      {
        title: "4.3 Resources",
        content: `
          <p>Resources are essential components that processes require for execution. Effective management of these resources involves understanding their types and implementing strategies for allocation and deallocation.</p>
          
          <h3>Types of Resources</h3>
          <ol>
            <li><strong>CPU</strong>: Central processing unit necessary for executing instructions.</li>
            <li><strong>Memory</strong>: Allocates space for program execution.</li>
            <li><strong>I/O Devices</strong>: Manage intermediate data interactions and present user interfaces.</li>
          </ol>
          
          <h3>Resource Allocation and Management</h3>
          <p>The management of resource allocation involves techniques that ensure processes have access to necessary resources without conflict. Allocation strategies may involve dynamic assignment or static partitioning.</p>
          
          <h3>Practical Examples and Management Techniques</h3>
          <p>Effective mechanisms are essential for optimal resources use. Practical approaches include preemptive scheduling for CPU resources and just-in-time memory allocation.</p>
          
          <h3>Image of Resources</h3>
          <p>Here is a diagram showing various resource types:</p>
          
          <img src="https://oaidalleapiprodscus.blob.core.windows.net/private/org-y8FuVyyLWmqXBCnIfKNmkrm5/user-RqKjnk1OKNHV2ljSIMJdsNEb/img-I2ak630adUQZeZJp9Bkc4uFV.png?st=2025-04-13T05%3A16%3A14Z&se=2025-04-13T07%3A16%3A14Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=d505667d-d6c1-4a0a-bac7-5c84a87759f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-04-12T15%3A39%3A25Z&ske=2025-04-13T15%3A39%3A25Z&sks=b&skv=2024-08-04&sig=ZXbpy9UglPnVOymZHQUkdZFEVHOieHabn/PP1iGIN5c%3D" alt="Resources in Operating System" style="max-width: 100%; height: auto; margin: 20px 0;" />
        `,
      },
      {
        title: "4.4 Deadlocks",
        content: `
          <p>A deadlock occurs when multiple processes cannot proceed because each is waiting for a resource held by another. Effective management of deadlocks is crucial for system stability.</p>
          
          <h3>Causes of Deadlocks</h3>
          <p>Deadlocks stem from several conditions:</p>
          <ol>
            <li><strong>Resource Holding</strong>: Processes keep resources while waiting for others.</li>
            <li><strong>Mutual Exclusion</strong>: Resources cannot be shared between processes.</li>
            <li><strong>No Preemption</strong>: Resources cannot be forcibly taken back.</li>
            <li><strong>Circular Wait</strong>: Processes form a circular chain, each waiting for a resource held by the next.</li>
          </ol>
          
          <h3>Deadlock Prevention</h3>
          <p>Strategies to prevent deadlocks involve ensuring that at least one above conditions does not occur, such as by using resource ordering or allowing preemption.</p>
          
          <h3>Deadlock Detection and Recovery</h3>
          <p>Deadlocks can be detected by identifying cycles in resource allocation graphs and resolved through preempting resources or process termination to break the cycle.</p>
          
          <h3>Image of Deadlocks</h3>
          <p>Here is a graphical illustration of how deadlocks occur:</p>
          
          <img src="https://oaidalleapiprodscus.blob.core.windows.net/private/org-y8FuVyyLWmqXBCnIfKNmkrm5/user-RqKjnk1OKNHV2ljSIMJdsNEb/img-MGJ7apDaMHs3TSnYX3cfJUQy.png?st=2025-04-13T05%3A17%3A36Z&se=2025-04-13T07%3A17%3A36Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=d505667d-d6c1-4a0a-bac7-5c84a87759f8&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-04-12T22%3A13%3A26Z&ske=2025-04-13T22%3A13%3A26Z&sks=b&skv=2024-08-04&sig=YIFLJneaJwF6Yu9KF9uH7f79/lvRg03w82XqjZAJVVg%3D" alt="Deadlocks in Operating System" style="max-width: 100%; height: auto; margin: 20px 0;" />
          
          <p>By understanding these core concepts of abstraction, processes, resources, and deadlocks, you will be better equipped to manage and optimize operating system functions for improved system performance and stability. Refer to provided resources for deeper exploration.</p>
        `,
      },
    ],
  };

  // Toggle section expansion
  const toggleSection = (sectionId: number) => {
    if (expandedSections.includes(sectionId)) {
      setExpandedSections(expandedSections.filter((id) => id !== sectionId));
    } else {
      setExpandedSections([...expandedSections, sectionId]);
    }
  };

  // Select subsection
  const selectSubsection = (sectionId: number, subsectionId: number) => {
    setCurrentSection(sectionId);
    setCurrentSubsection(subsectionId);
    if (!expandedSections.includes(sectionId)) {
      setExpandedSections([...expandedSections, sectionId]);
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      {/* Back navigation */}
      <div style={{ padding: "12px 20px", borderBottom: "1px solid #e5e7eb" }}>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#6366f1",
            padding: "0",
          }}
        >
          ← Home
        </button>
      </div>

      {/* Main content area */}
      <div style={{ padding: "20px" }}>
        <h1
          style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}
        >
          {courseName}
        </h1>

        {/* Sharing and Bloom's level */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
            alignItems: "flex-start",
          }}
        >
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              style={{
                display: "flex",
                alignItems: "center",
                padding: "6px 12px",
                border: "1px solid #d1d5db",
                borderRadius: "4px",
                background: "white",
                cursor: "pointer",
              }}
            >
              Share
            </button>
            <button
              style={{
                padding: "6px 12px",
                border: "1px solid #d1d5db",
                borderRadius: "4px",
                background: "white",
                cursor: "pointer",
              }}
            >
              ⋮
            </button>
          </div>

          <div style={{ marginLeft: "20px" }}>
            <div style={{ marginBottom: "8px" }}>
              Bloom's Taxonomy Level: {bloomsLevel.level}
            </div>

            {/* Gradient progress bar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "12px",
              }}
            >
              <div
                style={{
                  width: "150px",
                  height: "10px",
                  backgroundColor: "#e5e7eb",
                  borderRadius: "5px",
                  overflow: "hidden",
                  marginRight: "8px",
                }}
              >
                <div
                  style={{
                    width: `${
                      (bloomsLevel.value / bloomsLevel.maxValue) * 100
                    }%`,
                    height: "100%",
                    background: "linear-gradient(to right, #8b5cf6, #6366f1)",
                    borderRadius: "5px",
                  }}
                ></div>
              </div>
              <span style={{ fontSize: "14px" }}>
                {bloomsLevel.value}/{bloomsLevel.maxValue}
              </span>
            </div>

            {/* Larger Evaluate Again button */}
            <button
              style={{
                padding: "8px 16px",
                background: "#6366f1",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "medium",
                width: "100%",
              }}
            >
              Evaluate Again
            </button>
          </div>
        </div>

        {/* Two-column layout for content */}
        <div style={{ display: "flex", gap: "24px" }}>
          {/* Sidebar with course content */}
          <div style={{ width: "280px", flexShrink: 0 }}>
            <h2
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                marginBottom: "12px",
              }}
            >
              Course content
            </h2>

            <div style={{ marginBottom: "16px" }}>
              {completedSections} / {totalSections} sections completed
            </div>

            {/* Chapter list */}
            <div
              style={{
                border: "1px solid #e5e7eb",
                borderRadius: "4px",
                overflow: "hidden",
              }}
            >
              {chapters.map((chapter) => (
                <div key={chapter.id}>
                  <div
                    style={{
                      padding: "12px",
                      backgroundColor:
                        currentSection === chapter.id ? "#f3f4f6" : "white",
                      borderBottom: "1px solid #e5e7eb",
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                    onClick={() => toggleSection(chapter.id)}
                  >
                    <input
                      type="checkbox"
                      checked={chapter.completed}
                      readOnly
                      style={{ marginRight: "8px" }}
                    />
                    <div style={{ flex: 1 }}>
                      <div>
                        Chapter {chapter.id}: {chapter.title}
                      </div>
                      <div style={{ fontSize: "12px", color: "#6b7280" }}>
                        {chapter.duration}
                      </div>
                    </div>
                    <span style={{ marginLeft: "8px" }}>
                      {expandedSections.includes(chapter.id) ? "▾" : "▸"}
                    </span>
                  </div>

                  {expandedSections.includes(chapter.id) &&
                    chapter.subsections && (
                      <div style={{ backgroundColor: "#f9fafb" }}>
                        {chapter.subsections.map((subsection) => (
                          <div
                            key={subsection.id}
                            style={{
                              padding: "10px 10px 10px 32px",
                              borderBottom: "1px solid #e5e7eb",
                              backgroundColor:
                                currentSubsection === subsection.id
                                  ? "#e0e7ff"
                                  : "transparent",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                            }}
                            onClick={() =>
                              selectSubsection(chapter.id, subsection.id)
                            }
                          >
                            <input
                              type="radio"
                              checked={currentSubsection === subsection.id}
                              readOnly
                              style={{ marginRight: "8px" }}
                            />
                            <div>
                              {subsection.id} {subsection.title}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                </div>
              ))}
            </div>
          </div>

          {/* Main content */}
          <div style={{ flex: 1 }}>
            <h2
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                marginBottom: "24px",
              }}
            >
              {chapterContent.title}
            </h2>

            <div style={{ marginBottom: "24px" }}>
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  marginBottom: "16px",
                }}
              >
                Learning Objectives
              </h3>
              <p style={{ lineHeight: "1.5" }}>
                {chapterContent.learningObjectives}
              </p>
            </div>

            {/* Current section content */}
            <div style={{ marginBottom: "24px" }}>
              {currentSubsection && (
                <div>
                  <h3
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      marginBottom: "16px",
                    }}
                  >
                    {chapterContent.sections.find((s) =>
                      s.title.startsWith(currentSubsection.toString())
                    )?.title || ""}
                  </h3>
                  <div
                    dangerouslySetInnerHTML={{
                      __html:
                        chapterContent.sections.find((s) =>
                          s.title.startsWith(currentSubsection.toString())
                        )?.content || "",
                    }}
                    style={{
                      lineHeight: "1.6",
                      fontSize: "14px",
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningContentPage;
