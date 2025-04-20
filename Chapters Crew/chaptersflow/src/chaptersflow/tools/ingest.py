# ingest_pdfs.py

import os
import glob
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings

from langchain_community.vectorstores import Chroma

def ingest_pdfs(pdf_directory: str, persist_directory: str):
    # Get all PDF file paths in the specified directory
    pdf_files = glob.glob(os.path.join(pdf_directory, "*.pdf"))
    documents = []

    # Load documents from each PDF file
    for pdf_file in pdf_files:
        print(f"Loading: {pdf_file}")
        loader = PyPDFLoader(pdf_file)
        docs = loader.load()
        documents.extend(docs)
    
    print(f"Total documents loaded: {len(documents)}")

    # Split documents into smaller chunks with overlap for improved retrieval
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    docs = text_splitter.split_documents(documents)
    print(f"Documents split into {len(docs)} chunks.")

    # Retrieve the OpenAI API key from the environment
    openai_api_key = ""
    if not openai_api_key:
        raise ValueError("OPENAI_API_KEY environment variable not set.")

    # Create OpenAI embeddings using the latest LangChain syntax
    embeddings = OpenAIEmbeddings(openai_api_key=openai_api_key)
    
    # Build the FAISS vector store from the document chunks
    vector_store = Chroma.from_documents(documents=docs, 
                                           embedding=embeddings, 
                                           persist_directory=persist_directory)
    
    # Save the vector store locally so that ingestion happens only once
    


if __name__ == "__main__":
    pdf_directory = "pdfs"  # Update this path to your PDFs folder
    vector_db_path = "pdfs"           # Location to store the vector database
    ingest_pdfs(pdf_directory, vector_db_path)
