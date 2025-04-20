#!/usr/bin/env python
import sys
import warnings
from chaptersflow.crews.chapterscrew.crew import Cap
from datetime import datetime
from pydantic import BaseModel
from crewai.flow.flow import Flow, listen, start
from crewai import Agent, Crew, Process, Task
from crewai.project import CrewBase, agent, crew, task
from chaptersflow.tools.query1 import answer_question

class SyllabusState(BaseModel):
    syllabus_input: str = ""

class SyllabusFlow(Flow[SyllabusState]):

    @start()
    def generate_chapters(self):
        import os
        pdfs_dir =  r"C:\\Users\\User\\Desktop\\Chapters Crew\\chaptersflow\\src\\chaptersflow\\tools\\pdfs"
        aq = answer_question("What is the content of Module 1 from the Syllabus?", pdfs_dir)
        self.state.syllabus_input = aq
        print(self.state.syllabus_input)

    @listen(generate_chapters)
    def run(self):
        inputs = {
             'syllabus_mod1': self.state.syllabus_input,
        }
        
        try:
            Cap().crew().kickoff(inputs=inputs)
        except Exception as e:
            raise Exception(f"An error occurred while running the crew: {e}")
        
def kickoff():
    start = SyllabusFlow()
    start.kickoff()

def plot():
    syll_flow = SyllabusFlow()
    syll_flow.plot()

if __name__ == "__main__":
    kickoff()