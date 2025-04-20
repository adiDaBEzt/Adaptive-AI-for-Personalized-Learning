from crewai import Agent, Crew, Process, Task
from crewai.project import CrewBase, agent, crew, task
from crewai_tools import FileReadTool
from crewai_tools import VisionTool
vision_tool = VisionTool()
@CrewBase
class EvaluationCrew:
    """Crew for evaluating student answers using Bloom's Taxonomy framework"""

    agents_config = 'config/agents.yaml'
    tasks_config = 'config/tasks.yaml'

    @agent
    def content_reader(self) -> Agent:
        return Agent(
            config=self.agents_config['content_reader'],
            verbose=True,
            tools=[FileReadTool(), vision_tool]
        )

    @agent
    def evaluation_specialist(self) -> Agent:
        return Agent(
            config=self.agents_config['evaluation_specialist'],
            verbose=True,
            tools=[FileReadTool()]
        )

    @task
    def extract_content(self) -> Task:
        return Task(
            config=self.tasks_config['extract_content'],
            tools=[FileReadTool(), vision_tool]
        )

    @task
    def evaluate_answers(self) -> Task:
        return Task(
            config=self.tasks_config['evaluate_answers'],
            output_file="evaluation_report.md"
        )

    @crew
    def crew(self) -> Crew:
        """Creates the Evaluation Crew for assessing student answers"""

        return Crew(
            agents=self.agents,  # Automatically created by the @agent decorator
            tasks=self.tasks,    # Automatically created by the @task decorator
            process=Process.sequential,  # Ensuring tasks are done in order
            verbose=True
        )