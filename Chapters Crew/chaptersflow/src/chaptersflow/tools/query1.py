import os
from langchain_chroma import Chroma  # Updated import for Chroma
from langchain_openai import OpenAIEmbeddings  # Updated import for OpenAIEmbeddings
from langchain_openai import ChatOpenAI         # Updated import for ChatOpenAI
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate

def answer_question(question: str, persist_directory: str) -> str:
    # Retrieve the OpenAI API key from the environment
    openai_api_key = ""
    if not openai_api_key:
        raise ValueError("Please set the OPENAI_API_KEY environment variable.")
    
    # Initialize OpenAI embeddings
    embeddings = OpenAIEmbeddings(openai_api_key=openai_api_key)

    # Load the persisted Chroma vector store
    vector_store = Chroma(persist_directory=persist_directory, embedding_function=embeddings)
    
    # Create a retriever that fetches the top 3 relevant document chunks
    retriever = vector_store.as_retriever(search_kwargs={"k": 3})
    
    # Retrieve relevant documents for the given question
    docs = retriever.get_relevant_documents(question)
    
    # Combine the retrieved documents' content into a single context string
    context = "\n\n".join([doc.page_content for doc in docs])
    
    # Define a custom prompt template for GPT‑4
    custom_template = """
You are an expert in course modules and educational content.
Your task is to provide a detailed, well-formatted answer that includes all the necessary details for the SPECIFIC module the user wants
Please include:
- A bullet list of all topics covered in the module,
- The estimated time required to complete the module,
- Any subtopics or key points relevant to the module.
Ensure your answer is clear, concise, and well-structured. Do include the Topic Names excplicitly.dont give /n and all the characters.the output should have all this pre formatted and no other content.
do not give information of any other module.
eg:
query:what is mod1?
ans:details regarding mod1 content in the above format and no more.time taken for finishing this particular module and not complete syllabus


Question: {question}
Context: {context}
Answer:
"""
    prompt_template = PromptTemplate(template=custom_template, input_variables=["question", "context"])
    llm = ChatOpenAI(model_name="gpt-4", temperature=0, openai_api_key=openai_api_key)
    chain = LLMChain(llm=llm, prompt=prompt_template)
    answer = chain.run(question=question, context=context)
    return answer


    # chain = prompt_template | llm  # The new recommended method using LangChain Runnables
    # # Use invoke with multiple inputs (pass them as a dictionary)
    # answer = chain.invoke({"question": question, "context": context})
    # return answer

if __name__ == "__main__":
    persist_directory = r"pdfs"  # Ensure this matches your ingestion directory
    question = input("Enter your question: ")
    answer = answer_question(question, persist_directory)
    
    print("\nAnswer:")
    print(answer)
