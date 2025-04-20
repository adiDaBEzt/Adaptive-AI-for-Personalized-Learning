from crewai import Agent, Crew, Process, Task
from crewai_tools import FileReadTool, SerperDevTool, ScrapeWebsiteTool
from crewai.project import CrewBase, agent, task, crew
import contentcrew.tools.custom_tool as imgtool

@CrewBase
class ContentCrew:
    """Capstone Crew for report processing and educational content creation"""

    manager_config = 'config/manager.yaml'
    agents_config = 'config/agents.yaml'
    tasks_config = 'config/tasks.yaml'
    report_path = r"C:\Users\User\Desktop\Chapters Crew\chaptersflow\src\chaptersflow\tools\report.md"

    # def manager(self) -> Agent:
    #     return Agent(
    #         config=self.manager_config['manager'],
    #         verbose=True
    #     )
    
    manager = Agent(
		role="Project Manager",
		goal="Efficiently manage the crew and ensure high-quality task completion",
		backstory=
        """You are an experienced project manager, skilled in overseeing complex projects and guiding teams to success. 
		Your role is to coordinate the efforts of the crew members, ensuring that each task is completed on time 
		and to the highest standard.

		The workflow you manage follows a structured approach:
		1. **Data Collection** - Ensure the required chapter is extracted accurately from the report.
		2. **Web Research & Interpretation** - Guide the team in searching and analyzing relevant external resources, 
		including images, videos, and academic references.
		3. **Content Creation** - Oversee the development of well-structured educational content, integrating the 
		collected data and research insights into a comprehensive learning resource.

		Your primary responsibility is to optimize task execution, resolve dependencies, and guarantee 
		seamless collaboration between the agents to produce high-quality educational material.""",
		allow_delegation=True,
	)

    @agent
    def rag_expert(self) -> Agent:
        return Agent(
            config=self.agents_config['rag_expert'],
            verbose=True,
            tools=[FileReadTool()]
        )

    @agent
    def web_researcher(self) -> Agent:
        return Agent(
            config=self.agents_config['web_researcher'],
            verbose=True,
            tools = [SerperDevTool()],
        )
    
    @agent
    def content_creator(self) -> Agent:
        return Agent(
            config=self.agents_config['content_creator'],
            verbose=True,
            tools = [imgtool.dalle]
        )


    @task
    def extract_chapter_task(self) -> Task:
        return Task(
            config=self.tasks_config['extract_chapter']
        )

    @task
    def search_resources_task(self) -> Task:
        return Task(
            config=self.tasks_config['search_resources'],
        )
	
    @task
    def generate_content_task(self) -> Task:
        return Task(
            config=self.tasks_config['generate_content']
        )
	
    @crew
    def crew(self) -> Crew:
        """Creates the Capstone crew"""
        return Crew(
            agents=self.agents,  # Automatically created by the @agent decorator
            tasks=self.tasks,  # Automatically created by the @task decorator
            process=Process.sequential,
            verbose=True
        )
