
Section 1: Multiple Choice Questions (MCQs)
Question 1
Which of the following is NOT a characteristic of a real-time operating system?

Answer: b) Fast context switching

Fast context switching is actually a key feature of real-time operating systems that helps them achieve deterministic behavior. The correct answer should be c) Large memory footprint, as real-time systems typically aim to be lightweight.
Question 2
Which operating system structuring method uses a layered approach where each layer relies only on the layers below it?

Answer: b) Monolithic kernel

This is correct because monolithic kernels organize their code in layers with each layer only depending on lower layers. Microkernels use a different approach with minimal functionality in the kernel.


Section 2: Descriptive Questions
Question 1: Preemptive vs. Non-preemptive Scheduling
Preemptive scheduling means the CPU can be taken away from a process while it's running. Non-preemptive scheduling means once a process starts running, it keeps running until it finishes or gives up the CPU voluntarily.
Examples of Preemptive Scheduling:

Round Robin
Shortest Remaining Time First
Priority scheduling

Examples of Non-preemptive Scheduling:

First Come First Served (FCFS)
Shortest Job First
Priority scheduling (this can be both preemptive and non-preemptive)

The main advantage of preemptive scheduling is that it prevents any one process from monopolizing the CPU, while non-preemptive scheduling is simpler to implement but can lead to long waiting times if a process takes too long.


Question 2: Security Considerations in Embedded vs. Cloud-based Systems
Embedded Systems Security:

Limited memory and processing power
Often have no network connection
Usually run only one application
Hard to update after deployment

Cloud-based Systems Security:

Need to protect against internet attacks
Must protect one user's data from other users
Can be updated easily with security patches
Have complex access control requirements

The main difference is that embedded systems have limited resources but fewer attack vectors, while cloud systems have more resources for security but are exposed to more attacks. Embedded systems focus on physical security while cloud systems focus on network security.


Section 3: Diagram-Based Question
Question 1: Process State Diagram
Process states include:

New: Process is created
Ready: Process is waiting for CPU
Running: Process is executing
Waiting: Process is waiting for I/O
Terminated: Process is done

Transitions:

New → Ready: When process is created
Ready → Running: When scheduler selects process
Running → Ready: When time slice expires
Running → Waiting: When process needs I/O
Waiting → Ready: When I/O completes
Running → Terminated: When process finishes

[Note: A student would normally draw this diagram by hand]


Section 4: Application-Based Question
Question 1: Deadlock Explanation and Prevention
Deadlock happens when processes are stuck waiting for each other forever. For example, if Process A has Resource 1 and needs Resource 2, while Process B has Resource 2 and needs Resource 1, they will both wait forever.
The four conditions for deadlock are:

Mutual Exclusion - Resources can only be used by one process at a time
Hold and Wait - Processes keep resources while waiting for others
No Preemption - Resources can't be taken away from processes
Circular Wait - Processes are waiting for each other in a circle

To prevent deadlocks:

Make resources sharable (but this is usually not possible)
Make processes request all resources at the beginning
Allow the OS to take resources away from processes
Number all resources and make processes request them in order

The best way to handle deadlocks is the Banker's Algorithm, which checks if granting a resource request would lead to a deadlock. If it would, the request is denied until it's safe.