### **Chapter 4: Doubly Linked Lists**

#### **4.1 Structure of a Doubly Linked List Node**

A doubly linked list is a sophisticated type of linked list where each node contains three elements of information: the data, a pointer to the next node, and a pointer to the previous node. This structure allows for efficient traversal in both directions, forward and backward, unlike singly linked lists, which are limited to one direction.

##### **Node Structure and Diagrammatic Representation**

A typical node structure in a doubly linked list involves the following components:
- **Data**: The content or value stored within the node, which can be of any data type.
- **Next Pointer**: A reference to the succeeding node in the sequence.
- **Previous Pointer**: A reference to the preceding node in the sequence.

The following diagram illustrates the basic structure of a node in a doubly linked list:

![alt text](https://oaidalleapiprodscus.blob.core.windows.net/private/org-y8FuVyyLWmqXBCnIfKNmkrm5/user-RqKjnk1OKNHV2ljSIMJdsNEb/img-A87jHwohckYGT8XinNcqeapz.png?st=2025-04-17T03%3A30%3A30Z&se=2025-04-17T05%3A30%3A30Z&sp=r&sv=2024-08-04&sr=b&rscd=inline&rsct=image/png&skoid=cc612491-d948-4d2e-9821-2683df3719f5&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-04-16T22%3A03%3A38Z&ske=2025-04-17T22%3A03%3A38Z&sks=b&skv=2024-08-04&sig=gtRs4J%2Bfxcxxn5eXkdmCEd4vNPXtuMyVpzxGTjEdfWU%3D)

The head node is the first element in the list, and the last node typically points to `null` in its `next` field, denoting the end of the list. Similarly, the `prev` field of the head node is also typically null.

```c
// C structure for a Doubly Linked List Node
struct Node {
    int data;
    struct Node* next;
    struct Node* prev;
};
```

The above code snippet demonstrates the basic structure of a node in a doubly linked list using C. The `next` and `prev` pointers are used to traverse the list forwards and backwards, respectively.

#### **4.2 Implementing Insertion in Doubly Linked List**

Inserting elements in a doubly linked list can be done in multiple ways, offering greater flexibility due to its bidirectional nature. The primary insertion operations include:
- **Insertion at the Beginning**: Adds a new node at the start of the list.
- **Insertion at the End**: Appends a new node at the list's end.
- **Insertion in the Middle**: Places a new node at any specified position within the list.

##### **Insertion at the Beginning**

To insert a new node at the beginning of the list, you must adjust both the `prev` pointer of the existing head node and the `next` pointer of the new node. Here is a step-by-step process:

1. **Allocate Memory for the New Node**: Create a new node and allocate memory for it.
2. **Assign Data to the New Node**: Decide the data to be stored at this node.
3. **Adjust Pointers**: 
   - Set the new node's `next` pointer to the current head.
   - Change the current head's `prev` pointer to the new node.
4. **Update the Head**: Make the new node the new head of the list.

```c
void insertAtBeginning(struct Node** head_ref, int new_data) {
    struct Node* new_node = (struct Node*)malloc(sizeof(struct Node));
    new_node->data = new_data;
    new_node->next = (*head_ref);
    new_node->prev = NULL;
    if ((*head_ref) != NULL)
        (*head_ref)->prev = new_node;
    *head_ref = new_node;
}
```

This function is an example of inserting a new node at the beginning of a doubly linked list in C.

##### **Insertion at the End**

When a new node is added to the end of the list, the `next` pointer of the current last node and the new node’s `prev` pointer must be adjusted accordingly.

1. **Traverse to the Last Node**: Start from the head node and traverse to the end of the list.
2. **Allocate Memory for the New Node**: Create and allocate memory for the new node.
3. **Update Pointers**:
   - Set the `next` of the current last node to the new node.
   - Set the new node's `prev` to the current last node.
4. **Set the New Node’s `next` to NULL**: Indicating it is the last node.

```c
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
```

This code snippet explains how to append a node at the end of a doubly linked list.

##### **Insertion in the Middle**

To insert within a list, traverse to the required position and update pointers to incorporate the new node into the sequence.

1. **Locate the Position**: Traverse up to the node after which the new node is to be inserted.
2. **Update the Pointers**: 
   - Set the `next` of the new node to `next` of previous node.
   - Update the `prev` of new node to previous node.
   - Adjust the `prev` of next node to new node.
   - Finally, set the `next` of the previous node to new node.

```c
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
```

This function inserts a node after a specific node in the list, showcasing the flexibility of insertion operations in a doubly linked list.

#### **4.3 Implementing Deletion in Doubly Linked List**

Doubly linked lists allow for deletion from any part of the list with relative ease, as each node is aware of its predecessor. The following operations describe how deletions can be managed:
- **Deletion from the Beginning**: Removing the head node and adjusting pointers accordingly.
- **Deletion from the End**: Removing the last node and ensuring the last node's `prev` points to `NULL`.
- **Deletion from the Middle**: Adjusting pointers to bypass the node slated for removal.

##### **Deletion from the Beginning**

Remove the head node and update pointers within a three-step operation:
1. **Check If the List is Empty**: If yes, simply return.
2. **Update Head Pointer**: Set the head of the list to the next node.
3. **Free Memory**: Deallocate the memory occupied by the previous head node.

```c
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
```

This code efficiently removes a node considering edge cases like empty lists or when the node to be deleted is the only node present.

##### **Deletion from the End**

The last node can similarly be removed by adjusting the pointers of the penultimate node.

1. **Traverse to the Last Node**: Start from the head node and traverse to the penultimate node.
2. **Update the Second-last node Pointer**: Set the `next` of the second-last node to `NULL`.
3. **Free the Last Node’s Memory**: Remove the memory allocation of the last node.

```c
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
```

The function demonstrates a practical approach to remove the final node from a doubly linked list.

##### **Deletion from the Middle**

Nodes can be removed from the middle by altering adjacent node pointers.

1. **Find the Node**: Use traversal methods to find the node targeted for removal.
2. **Update Adjacent Pointers**: Alter the `prev` and `next` pointers of neighboring nodes to skip over the node being deleted.
3. **Free Memory**: Deallocate memory to manage resources effectively.

```c
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
```

This method ensures that nodes are removed correctly while maintaining the integrity of adjacent nodes in the list.

#### **4.4 Traversing a Doubly Linked List**

Traversal in a doubly linked list is more versatile because nodes can be accessed from either direction utilizing both `next` and `prev` pointers.

##### **Forward Traversal**

Forward traversal starts at the head node moving towards the last node. Here’s how it functions:

1. **Start at the Head**: Initialize at the head and proceed until you find that `next` is `NULL`.
2. **Iterate Over Nodes**: Access each node in sequence and utilize or print node data as needed.

```c
void printList(struct Node* node) {
    struct Node* last;
    printf("\nTraversal in forward direction \n");
    while (node != NULL) {
        printf(" %d ", node->data);
        last = node;
        node = node->next;
    }
}
```

The above function exemplifies how the next pointers facilitate a natural sequence from the beginning to the end of the list.

##### **Backward Traversal**

Backward traversal offers flexibility not found in singly linked lists. To perform backward traversal:

1. **Begin from Last Node**: Reach the node where `next` is `NULL`.
2. **Iterate Using `prev`**: Use the `prev` pointers to iterate back toward the head.

```c
void printReverse(struct Node* node) {
    struct Node* last;
    while (node != NULL) {
        last = node;
        node = node->next;
    }
    printf("\nTraversal in reverse direction \n");
    while (last != NULL) {
        printf(" %d ", last->data);
        last = last->prev;
    }
}
```

This methodology highlights why doubly linked lists are preferred when bidirectional data navigation is required.

#### **4.5 Comparison with Singly Linked Lists**

When comparing doubly linked lists with singly linked lists, several considerations emerge based on efficiency, memory usage, and functionality.

##### **Advantages of Doubly Linked Lists**

1. **Bidirectional Traversal**: Nodes can be accessed in both directions, allowing backward explorations that are impossible without reversing the entire array.
2. **Ease of Deletion**: Deleting a node in the middle does not require iterative traversal to the previous node, making deletions faster and more straightforward strategically.
3. **Reversing a List**: Direct access to `prev` pointers affords a natural reordering and toggling feature.

##### **Disadvantages Compared to Singly Linked Lists**

1. **Memory Use**: Each node requires additional memory for a pointer--doubling pointer requirements per node.
2. **Increased Overheads**: Maintaining the additional pointer can lead to increased developer overhead when it comes to debugging.
3. **Insertion Complexity**: While nodes can be added anywhere, managing both pointers can necessitate more complex algorithms.

Nonetheless, when the use case demands rapid access or manipulations from both ends of the list, doubly linked lists shine as an invaluable data structure.

#### **Additional Resources**

1. [GeeksforGeeks Tutorial](https://www.geeksforgeeks.org/doubly-linked-list/)
2. [Programiz Explanation](https://www.programiz.com/dsa/doubly-linked-list)
3. [GeeksforGeeks Guide to Deleting Nodes](https://www.geeksforgeeks.org/delete-a-node-in-a-doubly-linked-list/)
4. [Programiz Explanation on Deletion](https://www.programiz.com/dsa/doubly-linked-list)
5. [Traversal Tutorial on GeeksforGeeks](https://www.geeksforgeeks.org/traversal-in-doubly-linked-list/)
6. [GeeksforGeeks Comparison Article](https://www.geeksforgeeks.org/difference-between-singly-linked-list-and-doubly-linked-list/)

Through this deep dive into doubly linked lists, students can appreciate the nuanced differences separating them from singly linked counterparts and recognize when they are most applicable in complex programming solutions.