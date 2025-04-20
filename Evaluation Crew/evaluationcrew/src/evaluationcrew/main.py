#!/usr/bin/env python
import sys
import warnings

from datetime import datetime

from evaluationcrew.crew import EvaluationCrew

warnings.filterwarnings("ignore", category=SyntaxWarning, module="pysbd")

# This main file is intended to be a way for you to run your
# crew locally, so refrain from adding unnecessary logic into this file.
# Replace with inputs you want to test with, it will automatically
# interpolate any tasks and agents information

def run():
    """
    Run the evaluation crew.
    """
    inputs = {
        'questions_path': r"C:\Users\User\Desktop\Testing Crew\testingflow\questions.md",
        'answers_path': r"C:\Users\User\Desktop\Evaluation Crew\evaluationcrew\answers.md",
        'image_path': r"C:\Users\User\Desktop\Evaluation Crew\evaluationcrew\download.jpg",
    }
    
    try:
        EvaluationCrew().crew().kickoff(inputs=inputs)
    except Exception as e:
        raise Exception(f"An error occurred while running the evaluation crew: {e}")


if __name__ == "__main__":
    run()