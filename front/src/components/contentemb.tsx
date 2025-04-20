import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

// Add these type definitions
interface Subsection {
  id: string;
  title: string;
  selected: boolean;
}

interface Chapter {
  id: number;
  title: string;
  duration: string;
  completed: boolean;
  subsections?: Subsection[];
}

interface Section {
  id: string;
  title: string;
  content: string;
}

interface ChapterContent {
  title: string;
  learningObjectives: string;
  sections: Section[];
}

const EmbeddedSystemsContentPage = () => {
  const [currentModule, setCurrentModule] = useState(5);
  const [currentSubsection, setCurrentSubsection] = useState("5.4");
  const [expandedModules, setExpandedModules] = useState([5]);
  
  // Course data
  const courseName = "Introduction to Embedded Systems";
  const chapters: Chapter[] = [
    {
      id: 1,
      title: "What are Embedded Systems?",
      duration: "1 hour",
      completed: true
    },
    {
      id: 2,
      title: "Design Challenges in Embedded Systems",
      duration: "1 hour",
      completed: true
    },
    {
      id: 3,
      title: "Embedded Processor Technology",
      duration: "1 hour",
      completed: true
    },
    {
      id: 4,
      title: "Hardware Design Fundamentals",
      duration: "1 hour",
      completed: true
    },
    {
      id: 5,
      title: "Microcontroller Architectures",
      duration: "1 hour",
      completed: false,
      subsections: [
        { id: "5.1", title: "8051 Architecture", selected: false },
        { id: "5.2", title: "PIC Architecture", selected: false },
        { id: "5.3", title: "ARM Architecture", selected: false },
        { id: "5.4", title: "Comparison of the Three Architectures", selected: true }
      ]
    }
  ];

  // Chapter content
  const chapterContent: ChapterContent = {
    title: "Chapter 5: Microcontroller Architectures (8051, PIC, ARM)",
    learningObjectives: "In this chapter, students will gain insights into three widely used microcontroller architectures: 8051, PIC, and ARM. By the end of this section, students will be equipped to compare their features and capabilities, serving as a foundation for more detailed exploration in subsequent modules. This chapter builds on Chapters 3 and 4 by providing concrete examples of microcontroller architectures and explaining their practical applications and performance metrics.",
    sections: [
      {
        id: "5.1",
        title: "8051 Architecture",
        content: `
### Overview
The 8051 microcontroller has been a significant player in the embedded system environment since the early 1980s. Developed by Intel, it offers a robust architecture that has become the backbone of many embedded systems, primarily due to its simplicity and flexibility. 

### Registers
The 8051 has a diverse set of registers, playing critical roles in executing instructions efficiently. It comprises the following:
- **Accumulator (ACC)**: Essential for arithmetic operations.
- **B Register**: Utilized in conjunction with the accumulator for multiplication and division operations.
- **Program Counter (PC)**: Points to the next instruction to be executed.
- **Stack Pointer (SP)**: Serves in stack operations, facilitating data storage during interrupts.

### Memory Map
The memory architecture of the 8051 is divided into Program Memory and Data Memory. 
- The **Program Memory** (often read-only) stores the code, while the Data Memory (RAM) stores interim data variables and stack data. The 8051 can address 64 KB of program memory space and 256 bytes of data memory, segmented further into internal and external data memory.

### Instruction Set
The 8051 microcontroller's instruction set is optimized for highly efficient real-time manipulation and control-oriented applications, containing a mix of byte and bit-level instructions for efficient processing. This expands its usability in operations requiring quick and reliable execution, significant in critical time-based applications.`
      },
      {
        id: "5.2",
        title: "PIC Architecture",
        content: `
### Overview
PIC microcontrollers, produced by Microchip Technology, are renowned for their performance and ease of use in various applications like automotive, industrial, and consumer electronics.

### Registers
PIC's enhanced architecture includes a large register set. The General Purpose Registers (GPRs) facilitate rapid data processing, supported by the Working Register which acts as an accumulator.

### Memory Map
The architecture allows for flexible, complex memory usage:
- **Program Memory**: Typically holding non-volatile instructions.
- **Data Memory (RAM)**: Used for volatile data storage - notably beneficial in applications needing quick and temporary data retrieval.

### Instruction Set
The PIC instruction set architecture promotes reduced instruction cycle time while ensuring flexibility. The reduced instruction set computing (RISC) nature contributes to its efficiency in handling complex operations swiftly, critical in high-speed automation scenarios.`
      },
      {
        id: "5.3",
        title: "ARM Architecture",
        content: `
### Overview
ARM architecture stands out with modern, efficient processing capabilities, extensively used in smartphones, tablets, and a gamut of embedded applications due to its low power consumption and high performance.

### Registers
ARM processors feature a more sophisticated register structure, typically containing 16 to 31 general-purpose registers, enhancing data handling capabilities and processing power.

### Memory Map
ARM architecture employs a flat memory model supporting various memory types (e.g., cache, RAM), optimizing system performance.

### Instruction Set
With distinct sets like the ARM instruction set and the Thumb instruction set, ARM offers flexibility for developers, balancing performance with power efficiency, crucial in mobile and wearable technology production.`
      },
      {
        id: "5.4",
        title: "Comparison of the Three Architectures",
        content: `
### Performance and Power
- **8051**: Low power consumption is optimal for basic applications.
- **PIC**: Moderate in power use, balancing performance and energy conservation well.
- **ARM**: Superior performance; design facilitates high computational tasks with energy efficiency.

### Application Suitability
- **8051**: Simple control tasks.
- **PIC**: Versatile applications from simple to moderately complex tasks.
- **ARM**: High-demand applications requiring robust processing.

### Summary
Each architecture carries unique strengths, serving various market needs and requirements. ARM stands out for complex applications, PIC balances flexibility and performance, while 8051 serves as a sturdy choice for simpler applications.`
      }
    ]
  };

  // Toggle module expansion
  const toggleModule = (moduleId: number) => {
    if (expandedModules.includes(moduleId)) {
      setExpandedModules(expandedModules.filter(id => id !== moduleId));
    } else {
      setExpandedModules([...expandedModules, moduleId]);
    }
  };

  // Select subsection
  const selectSubsection = (moduleId: number, subsectionId: string) => {
    setCurrentModule(moduleId);
    setCurrentSubsection(subsectionId);
    if (!expandedModules.includes(moduleId)) {
      setExpandedModules([...expandedModules, moduleId]);
    }
  };

  // Get current section content
  const currentSection = chapterContent.sections.find(section => section.id === currentSubsection);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '100%', margin: '0 auto' }}>
      {/* Back navigation */}
      <div style={{ padding: '12px 20px', borderBottom: '1px solid #e5e7eb' }}>
        <button style={{
          display: 'flex',
          alignItems: 'center',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: '#6366f1',
          padding: '0',
          fontSize: '14px'
        }}>
          <ArrowLeft size={16} style={{ marginRight: '4px' }} />
          Home
        </button>
      </div>
      
      {/* Main Content */}
      <div style={{ padding: '20px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>
          {courseName}
        </h1>
        
        {/* Sharing and Bloom's level */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start',
          marginBottom: '32px' 
        }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button style={{
              padding: '8px 12px',
              border: '1px solid #d1d5db',
              borderRadius: '4px',
              background: 'white',
              cursor: 'pointer',
              fontSize: '14px'
            }}>
              Share
            </button>
            <button style={{
              padding: '8px 12px',
              border: '1px solid #d1d5db',
              borderRadius: '4px',
              background: 'white',
              cursor: 'pointer',
              fontSize: '14px'
            }}>
              ⋮
            </button>
          </div>
          
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '14px', marginBottom: '4px' }}>
              Bloom's Taxonomy Level: Evaluate
            </div>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'flex-end', 
              marginBottom: '8px' 
            }}>
              <div style={{ 
                width: '100px', 
                height: '8px', 
                backgroundColor: '#e5e7eb',
                borderRadius: '4px',
                overflow: 'hidden',
                marginRight: '8px'
              }}>
                <div style={{
                  width: '83%',
                  height: '100%',
                  backgroundColor: '#6366f1',
                  borderRadius: '4px'
                }}></div>
              </div>
              <span>5/6</span>
            </div>
            <button style={{
              padding: '8px 12px',
              width: '100%',
              backgroundColor: '#6366f1',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px'
            }}>
              Evaluate Again
            </button>
          </div>
        </div>
        
        {/* Two-column layout */}
        <div style={{ display: 'flex', gap: '24px' }}>
          {/* Sidebar with course content */}
          <div style={{ width: '280px', flexShrink: 0 }}>
            <h2 style={{ 
              fontSize: '18px', 
              fontWeight: 'bold', 
              marginBottom: '12px' 
            }}>
              Course content
            </h2>
            
            <div style={{ marginBottom: '16px', fontSize: '14px' }}>
              18 / 22 sections completed
            </div>
            
            {/* Chapter list */}
            <div>
              {chapters.map(chapter => (
                <div key={chapter.id} style={{ marginBottom: '1px' }}>
                  <div 
                    style={{
                      padding: '12px',
                      border: '1px solid #e5e7eb',
                      backgroundColor: 'white',
                      display: 'flex',
                      alignItems: 'flex-start',
                      cursor: 'pointer'
                    }}
                    onClick={() => toggleModule(chapter.id)}
                  >
                    <input 
                      type="checkbox" 
                      checked={chapter.completed}
                      readOnly
                      style={{ marginRight: '8px', marginTop: '2px' }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '14px' }}>
                        {chapter.title}
                      </div>
                      <div style={{ fontSize: '13px', color: '#6b7280', marginTop: '4px' }}>
                        {chapter.duration}
                      </div>
                    </div>
                    {chapter.subsections && (
                      <div style={{ marginLeft: '8px' }}>
                        {expandedModules.includes(chapter.id) ? '▾' : '▸'}
                      </div>
                    )}
                  </div>
                  
                  {expandedModules.includes(chapter.id) && chapter.subsections && (
                    <div>
                      {chapter.subsections.map(subsection => (
                        <div 
                          key={subsection.id}
                          style={{
                            padding: '12px 12px 12px 32px',
                            border: '1px solid #e5e7eb',
                            borderTop: 'none',
                            backgroundColor: currentSubsection === subsection.id ? '#eef2ff' : 'white',
                            display: 'flex',
                            alignItems: 'center',
                            cursor: 'pointer'
                          }}
                          onClick={() => selectSubsection(chapter.id, subsection.id)}
                        >
                          <input 
                            type="radio"
                            checked={currentSubsection === subsection.id}
                            readOnly
                            style={{ marginRight: '8px' }}
                          />
                          <div style={{ fontSize: '14px' }}>
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
            <h2 style={{ 
              fontSize: '24px', 
              fontWeight: 'bold', 
              marginBottom: '24px' 
            }}>
              {chapterContent.title}
            </h2>
            
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ 
                fontSize: '20px', 
                fontWeight: 'bold', 
                marginBottom: '16px' 
              }}>
                Learning Objectives
              </h3>
              <p style={{ lineHeight: '1.5' }}>
                {chapterContent.learningObjectives}
              </p>
            </div>
            
            {currentSection && (
              <div>
                <h3 style={{ 
                  fontSize: '20px', 
                  fontWeight: 'bold', 
                  marginBottom: '16px' 
                }}>
                  {currentSection.id} {currentSection.title}
                </h3>
                <div 
                  style={{ lineHeight: '1.6' }}
                  dangerouslySetInnerHTML={{ __html: currentSection.content.replace(/\n\n/g, '<br/><br/>').replace(/###\s(.*)/g, '<h4 style="font-size: 18px; font-weight: bold; margin-top: 20px; margin-bottom: 12px;">$1</h4>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/- (.*)/g, '<li style="margin-left: 20px; margin-bottom: 8px;">$1</li>') }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmbeddedSystemsContentPage;