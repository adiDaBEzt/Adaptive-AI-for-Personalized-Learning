import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

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

const DoublyLinkedListsContentPage = () => {
  const [currentModule, setCurrentModule] = useState(4);
  const [currentSubsection, setCurrentSubsection] = useState("4.2");
  const [expandedModules, setExpandedModules] = useState([4]);
  
  // Course data
  const courseName = "Data Structures and Algorithms";
  const chapters: Chapter[] = [
    {
      id: 1,
      title: "Arrays and Strings",
      duration: "1 hour",
      completed: true
    },
    {
      id: 2,
      title: "Stacks and Queues",
      duration: "1.5 hours",
      completed: true
    },
    {
      id: 3,
      title: "Singly Linked Lists",
      duration: "2 hours",
      completed: true
    },
    {
      id: 4,
      title: "Doubly Linked Lists",
      duration: "2 hours",
      completed: false,
      subsections: [
        { id: "4.1", title: "Structure of a Doubly Linked List Node", selected: false },
        { id: "4.2", title: "Implementing Insertion in Doubly Linked List", selected: true },
        { id: "4.3", title: "Implementing Deletion in Doubly Linked List", selected: false },
        { id: "4.4", title: "Traversing a Doubly Linked List", selected: false },
        { id: "4.5", title: "Comparison with Singly Linked Lists", selected: false }
      ]
    },
    {
      id: 5,
      title: "Trees and Binary Search Trees",
      duration: "3 hours",
      completed: false
    }
  ];

  // Chapter content
  const chapterContent: ChapterContent = {
    title: "Chapter 4: Doubly Linked Lists",
    learningObjectives: "This chapter covers the structure and operations of doubly linked lists, exploring the node structure, insertion and deletion operations, traversal mechanisms, and comparisons with singly linked lists. Students will gain a comprehensive understanding of how to implement and manipulate doubly linked list data structures.",
    sections: [
      {
        id: "4.1",
        title: "Structure of a Doubly Linked List Node",
        content: `
A doubly linked list is a sophisticated type of linked list where each node contains three elements of information: the data, a pointer to the next node, and a pointer to the previous node. This structure allows for efficient traversal in both directions, forward and backward, unlike singly linked lists, which are limited to one direction.

### Node Structure and Diagrammatic Representation

A typical node structure in a doubly linked list involves the following components:
- **Data**: The content or value stored within the node, which can be of any data type.
- **Next Pointer**: A reference to the succeeding node in the sequence.
- **Previous Pointer**: A reference to the preceding node in the sequence.

The head node is the first element in the list, and the last node typically points to \`null\` in its \`next\` field, denoting the end of the list. Similarly, the \`prev\` field of the head node is also typically null.

\`\`\`c
// C structure for a Doubly Linked List Node
struct Node {
    int data;
    struct Node* next;
    struct Node* prev;
};
\`\`\`

The above code snippet demonstrates the basic structure of a node in a doubly linked list using C. The \`next\` and \`prev\` pointers are used to traverse the list forwards and backwards, respectively.`
      },
      {
        id: "4.2",
        title: "Implementing Insertion in Doubly Linked List",
        content: `
Inserting elements in a doubly linked list can be done in multiple ways, offering greater flexibility due to its bidirectional nature. The primary insertion operations include:
- **Insertion at the Beginning**: Adds a new node at the start of the list.
- **Insertion at the End**: Appends a new node at the list's end.
- **Insertion in the Middle**: Places a new node at any specified position within the list.

### Insertion at the Beginning

To insert a new node at the beginning of the list, you must adjust both the \`prev\` pointer of the existing head node and the \`next\` pointer of the new node. Here is a step-by-step process:

1. **Allocate Memory for the New Node**: Create a new node and allocate memory for it.
2. **Assign Data to the New Node**: Decide the data to be stored at this node.
3. **Adjust Pointers**: 
   - Set the new node's \`next\` pointer to the current head.
   - Change the current head's \`prev\` pointer to the new node.
4. **Update the Head**: Make the new node the new head of the list.

\`\`\`c
void insertAtBeginning(struct Node** head_ref, int new_data) {
    struct Node* new_node = (struct Node*)malloc(sizeof(struct Node));
    new_node->data = new_data;
    new_node->next = (*head_ref);
    new_node->prev = NULL;
    if ((*head_ref) != NULL)
        (*head_ref)->prev = new_node;
    *head_ref = new_node;
}
\`\`\`

This function is an example of inserting a new node at the beginning of a doubly linked list in C.

### Insertion at the End

When a new node is added to the end of the list, the \`next\` pointer of the current last node and the new node's \`prev\` pointer must be adjusted accordingly.

1. **Traverse to the Last Node**: Start from the head node and traverse to the end of the list.
2. **Allocate Memory for the New Node**: Create and allocate memory for the new node.
3. **Update Pointers**:
   - Set the \`next\` of the current last node to the new node.
   - Set the new node's \`prev\` to the current last node.
4. **Set the New Node's \`next\` to NULL**: Indicating it is the last node.

\`\`\`c
void insertAtEnd(struct Node** head_ref, int new_data) {
    struct Node* new_node = (struct Node*)malloc(sizeof(struct Node));
    struct Node* last = *head_ref;
    new_node->data = new_data;
    new_node->next = NULL;
    
    if (*head_ref == NULL) {
        new_node->prev = NULL;
        *head_ref = new_node;
        return;
    }
    
    while (last->next != NULL)
        last = last->next;
    
    last->next = new_node;
    new_node->prev = last;
}
\`\`\`

This code snippet explains how to append a node at the end of a doubly linked list.

### Insertion in the Middle

To insert within a list, traverse to the required position and update pointers to incorporate the new node into the sequence.

1. **Locate the Position**: Traverse up to the node after which the new node is to be inserted.
2. **Update the Pointers**: 
   - Set the \`next\` of the new node to \`next\` of previous node.
   - Update the \`prev\` of new node to previous node.
   - Adjust the \`prev\` of next node to new node.
   - Finally, set the \`next\` of the previous node to new node.

\`\`\`c
void insertAfter(struct Node* prev_node, int new_data)
{
    if (prev_node == NULL) {
        printf("The given previous node cannot be NULL");
        return;
    }
 
    struct Node* new_node = (struct Node*)malloc(sizeof(struct Node));
    new_node->data = new_data;
    new_node->next = prev_node->next;
    prev_node->next = new_node;
    new_node->prev = prev_node;
 
    if (new_node->next != NULL)
        new_node->next->prev = new_node;
}
\`\`\`

This function inserts a node after a specific node in the list, showcasing the flexibility of insertion operations in a doubly linked list.`
      },
      {
        id: "4.3",
        title: "Implementing Deletion in Doubly Linked List",
        content: `
Doubly linked lists allow for deletion from any part of the list with relative ease, as each node is aware of its predecessor. The following operations describe how deletions can be managed:
- **Deletion from the Beginning**: Removing the head node and adjusting pointers accordingly.
- **Deletion from the End**: Removing the last node and ensuring the last node's \`prev\` points to \`NULL\`.
- **Deletion from the Middle**: Adjusting pointers to bypass the node slated for removal.

### Deletion from the Beginning

Remove the head node and update pointers within a three-step operation:
1. **Check If the List is Empty**: If yes, simply return.
2. **Update Head Pointer**: Set the head of the list to the next node.
3. **Free Memory**: Deallocate the memory occupied by the previous head node.

\`\`\`c
void deleteNode(struct Node** head_ref, struct Node* del) {
    if (*head_ref == NULL || del == NULL)
        return;

    if (*head_ref == del)
        *head_ref = del->next;

    if (del->next != NULL)
        del->next->prev = del->prev;

    if (del->prev != NULL)
        del->prev->next = del->next;

    free(del);
}
\`\`\`

This code efficiently removes a node considering edge cases like empty lists or when the node to be deleted is the only node present.

### Deletion from the End

The last node can similarly be removed by adjusting the pointers of the penultimate node.

1. **Traverse to the Last Node**: Start from the head node and traverse to the penultimate node.
2. **Update the Second-last node Pointer**: Set the \`next\` of the second-last node to \`NULL\`.
3. **Free the Last Node's Memory**: Remove the memory allocation of the last node.

\`\`\`c
void deleteLastNode(struct Node** head) {
    if (*head == NULL)
        return;
    struct Node* last = *head;
 
    if ((*head)->next == NULL) {
        *head = NULL;
        free(last);
        return;
    }
 
    while (last->next != NULL)
        last = last->next;
 
    last->prev->next = NULL;
    free(last);
}
\`\`\`

The function demonstrates a practical approach to remove the final node from a doubly linked list.

### Deletion from the Middle

Nodes can be removed from the middle by altering adjacent node pointers.

1. **Find the Node**: Use traversal methods to find the node targeted for removal.
2. **Update Adjacent Pointers**: Alter the \`prev\` and \`next\` pointers of neighboring nodes to skip over the node being deleted.
3. **Free Memory**: Deallocate memory to manage resources effectively.

\`\`\`c
void deleteNodeAt(struct Node** head_ref, int position) {
    if (*head_ref == NULL || position < 0)
        return;

    struct Node* current = *head_ref;
    int i;
    for (i = 0; current != NULL && i < position; i++)
        current = current->next;

    if (current == NULL)
        return;
    
    deleteNode(head_ref, current);
}
\`\`\`

This method ensures that nodes are removed correctly while maintaining the integrity of adjacent nodes in the list.`
      },
      {
        id: "4.4",
        title: "Traversing a Doubly Linked List",
        content: `
Traversal in a doubly linked list is more versatile because nodes can be accessed from either direction utilizing both \`next\` and \`prev\` pointers.

### Forward Traversal

Forward traversal starts at the head node moving towards the last node. Here's how it functions:

1. **Start at the Head**: Initialize at the head and proceed until you find that \`next\` is \`NULL\`.
2. **Iterate Over Nodes**: Access each node in sequence and utilize or print node data as needed.

\`\`\`c
void printList(struct Node* node) {
    struct Node* last;
    printf("\\nTraversal in forward direction \\n");
    while (node != NULL) {
        printf(" %d ", node->data);
        last = node;
        node = node->next;
    }
}
\`\`\`

The above function exemplifies how the next pointers facilitate a natural sequence from the beginning to the end of the list.

### Backward Traversal

Backward traversal offers flexibility not found in singly linked lists. To perform backward traversal:

1. **Begin from Last Node**: Reach the node where \`next\` is \`NULL\`.
2. **Iterate Using \`prev\`**: Use the \`prev\` pointers to iterate back toward the head.

\`\`\`c
void printReverse(struct Node* node) {
    struct Node* last;
    while (node != NULL) {
        last = node;
        node = node->next;
    }
    printf("\\nTraversal in reverse direction \\n");
    while (last != NULL) {
        printf(" %d ", last->data);
        last = last->prev;
    }
}
\`\`\`

This methodology highlights why doubly linked lists are preferred when bidirectional data navigation is required.`
      },
      {
        id: "4.5",
        title: "Comparison with Singly Linked Lists",
        content: `
When comparing doubly linked lists with singly linked lists, several considerations emerge based on efficiency, memory usage, and functionality.

### Advantages of Doubly Linked Lists

1. **Bidirectional Traversal**: Nodes can be accessed in both directions, allowing backward explorations that are impossible without reversing the entire array.
2. **Ease of Deletion**: Deleting a node in the middle does not require iterative traversal to the previous node, making deletions faster and more straightforward strategically.
3. **Reversing a List**: Direct access to \`prev\` pointers affords a natural reordering and toggling feature.

### Disadvantages Compared to Singly Linked Lists

1. **Memory Use**: Each node requires additional memory for a pointer--doubling pointer requirements per node.
2. **Increased Overheads**: Maintaining the additional pointer can lead to increased developer overhead when it comes to debugging.
3. **Insertion Complexity**: While nodes can be added anywhere, managing both pointers can necessitate more complex algorithms.

Nonetheless, when the use case demands rapid access or manipulations from both ends of the list, doubly linked lists shine as an invaluable data structure.

### Additional Resources

1. [GeeksforGeeks Tutorial](https://www.geeksforgeeks.org/doubly-linked-list/)
2. [Programiz Explanation](https://www.programiz.com/dsa/doubly-linked-list)
3. [GeeksforGeeks Guide to Deleting Nodes](https://www.geeksforgeeks.org/delete-a-node-in-a-doubly-linked-list/)
4. [Programiz Explanation on Deletion](https://www.programiz.com/dsa/doubly-linked-list)
5. [Traversal Tutorial on GeeksforGeeks](https://www.geeksforgeeks.org/traversal-in-doubly-linked-list/)
6. [GeeksforGeeks Comparison Article](https://www.geeksforgeeks.org/difference-between-singly-linked-list-and-doubly-linked-list/)

Through this deep dive into doubly linked lists, students can appreciate the nuanced differences separating them from singly linked counterparts and recognize when they are most applicable in complex programming solutions.`
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
              12 / 20 sections completed
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
                        Chapter {chapter.id}: {chapter.title}
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
                  dangerouslySetInnerHTML={{ 
                    __html: currentSection.content
                      .replace(/\n\n/g, '<br/><br/>')
                      .replace(/###\s(.*)/g, '<h4 style="font-size: 18px; font-weight: bold; margin-top: 20px; margin-bottom: 12px;">$1</h4>')
                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      .replace(/- (.*)/g, '<li style="margin-left: 20px; margin-bottom: 8px;">$1</li>')
                      .replace(/```([^`]+)```/g, '<pre style="background-color: #f5f5f5; padding: 12px; border-radius: 4px; overflow-x: auto; margin: 20px 0;"><code>$1</code></pre>')
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoublyLinkedListsContentPage;