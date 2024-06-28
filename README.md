# Future Price Parts Predictor
 
## Getting Started
 
### Prerequisites
 
Ensure you have the following installed on your system:
- Node.js
- npm (Node Package Manager)
- Python (version 3.x)
- Virtualenv
 
### Running the Frontend
 
1. Navigate to the frontend directory:
    ```sh
    cd frontend
    ```
2. Install the dependencies:
    ```sh
    npm install
    ```
3. Start the frontend server:
    ```sh
    npm start
    ```
 
### Running the Backend
 
1. Navigate to the root directory of the project:
    ```sh
    cd ../
    ```
2. Create a virtual environment:
    - For Unix systems:
        ```sh
        python -m venv venv
        source venv/bin/activate
        ```
    - For Windows systems:
        ```sh
        python -m venv venv
        .\venv\Scripts\activate
        ```
 
3. Check if the `.keras` file exists in the project directory. If it doesn't, follow these steps:
    1. Install the required Python packages:
        ```sh
        pip install -r requirements.txt
        ```
    2. Run the entire Jupyter Notebook file (`.ipynb`) to generate the `.keras` file.
 
### Accessing the Application
 
Once both the frontend and backend are running, open your web browser and navigate to:
```sh
http://localhost:3000

Link to the video demo : https://youtu.be/MMTa7an45Pk