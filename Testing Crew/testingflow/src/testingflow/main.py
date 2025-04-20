#!/usr/bin/env python
import sys
import warnings
from testingflow.crews.test_crew.crew import EducationalAssessmentCrew
from pydantic import BaseModel
from crewai.flow.flow import Flow, listen, start

warnings.filterwarnings("ignore", category=SyntaxWarning)

class TestingState(BaseModel):
    syllabus_input: str = ""

class TestingFlow(Flow[TestingState]):

    @start()
    def run(self):
        """
        Run the Educational Assessment Crew.
        """
        inputs = {
            'path_var': "C:\\Users\\User\\Desktop\\Chapters Crew\\chaptersflow\\src\\chaptersflow\\tools\\report.md",
            'img_path': "C:\\Users\\User\\Desktop\\Testing Crew\\testingflow\\src\\testingflow\\tools\\img.png"
        }
   
        try:
            EducationalAssessmentCrew().crew().kickoff(inputs=inputs)
        except Exception as e:
            raise Exception(f"An error occurred while running the crew: {e}")


    # @listen(generate_chapters)
    # def run(self):
    #     inputs = {
    #          'syllabus_mod1': self.state.syllabus_input,
    #     }
        
    #     try:
    #         Cap().crew().kickoff(inputs=inputs)
    #     except Exception as e:
    #         raise Exception(f"An error occurred while running the crew: {e}")
    
def kickoff():
    start = TestingFlow()
    start.kickoff()

if __name__ == "__main__":
    kickoff()












def run():
    """
    Run the Educational Assessment Crew.
    """
    inputs = {
        'path_var': "C:\\Users\\User\\Desktop\\Chapters Crew\\chaptersflow\\src\\chaptersflow\\tools\\report.md"
    }
   
    try:
        EducationalAssessmentCrew().crew().kickoff(inputs=inputs)
    except Exception as e:
        raise Exception(f"An error occurred while running the crew: {e}")

# def train():
#     """
#     Train the crew for a given number of iterations.
#     """
#     try:
#         EducationalAssessmentCrew().crew().train(n_iterations=int(sys.argv[1]), filename=sys.argv[2])

#     except Exception as e:
#         raise Exception(f"An error occurred while training the crew: {e}")

# def replay():
#     """
#     Replay the crew execution from a specific task.
#     """
#     try:
#         EducationalAssessmentCrew().crew().replay(task_id=sys.argv[1])

#     except Exception as e:
#         raise Exception(f"An error occurred while replaying the crew: {e}")

# def test():
#     """
#     Test the crew execution and return the results.
#     """
#     try:
#         EducationalAssessmentCrew().crew().test(n_iterations=int(sys.argv[1]), openai_model_name=sys.argv[2])

#     except Exception as e:
#         raise Exception(f"An error occurred while testing the crew: {e}")

if __name__ == "__main__":
     run()

