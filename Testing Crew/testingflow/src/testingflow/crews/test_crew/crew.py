from crewai import Agent, Crew, Process, Task
from crewai.project import CrewBase, agent, crew, task
from crewai_tools import SerperDevTool
from crewai_tools import  FileReadTool
import testingflow.tools.custom_tool as imgtool

@CrewBase
class EducationalAssessmentCrew:
    """Crew for analyzing topics and generating Bloom's Taxonomy questions"""

    agents_config = 'config/agents.yaml'
    tasks_config = 'config/tasks.yaml'



    @agent
    def topic_analyzer(self) -> Agent:
        return Agent(
            config=self.agents_config['topic_analyzer'],
            verbose=True,
            tools = [SerperDevTool(), FileReadTool()]
        )

    @agent
    def question_developer(self) -> Agent:
        return Agent(
            config=self.agents_config['question_developer'],
            verbose=True,
            tools = [imgtool.dalle]
        )

    @task
    def analyze_topics(self) -> Task:
        return Task(
            config=self.tasks_config['analyze_topics'],
        )

    @task
    def generate_questions(self) -> Task:
        return Task(
            config=self.tasks_config['generate_questions'],
            tools = [imgtool.dalle],
            output_file="questions.md"
        )

    @crew
    def crew(self) -> Crew:
        """Creates the Educational Assessment Crew"""

        return Crew(
            agents=self.agents,  # Automatically created by the @agent decorator
            tasks=self.tasks,    # Automatically created by the @task decorator
            process=Process.sequential,  # Ensuring tasks are done in order
            verbose=True
        )
