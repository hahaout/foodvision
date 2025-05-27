PyTorch Deep Learning Project with Next.js, TypeScript, and Django - README

Project Overview
---------------
This project combines a PyTorch deep learning model with a modern web stack featuring Next.js (TypeScript) for the frontend and Django for the backend. 
The implementation is based on the PyTorch Deep Learning materials from mrdbourke/pytorch-deep-learning (https://github.com/mrdbourke/pytorch-deep-learning).

Tech Stack
----------
- Frontend: Next.js with TypeScript, tRPC
- Backend: Django
- AI/ML: PyTorch models from mrdbourke's repository
- Deployment: TBA

Getting Started
---------------

Prerequisites
-------------
- Node.js (v16 or later)
- Python (3.8 or later)
- pip
- pnpm
- git

Installation
------------
1. Clone the repository
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   ```

3. Set up the frontend (Next.js)
```bash
   cd frontend
   pnpm install
```

5. Set up the backend (Django)
   ```bash
   cd ../backend
   python -m venv venv # to create virtual environmen(venv)
   . /venv/Scripts/activate.ps1 # to activate venv
   pip install -r requirements.txt
   ```

Project Structure
----------------
```
foodvision
├ backend
│   ├ ai_models     (contains api for pizza-steak-sushi AI model)
│   ├ backend       (settings for django)
│   ├ food_images   (saved food images)
│   ├  history      (api for history page)
│   └ db.sqlite3    (Database for backend)
│ ....
└ frontend
   ├ public         (images)
   └ src   
      ├ app         
      |  ├ (main)   (Home Page)
      |  └ history  (History Page)
      ├ components  (components from ShadCN UI)
      ├ hooks       (hook for server-side actions)
      ├ lib         (utils file)
      ├ schemas     (schemas for Type-Safe)
      ├ server      (tRPC server/cilent for api-fetching)
      └ trpc        (tRPC code)
      ....
```
Running the Application
----------------------
1. Start the Django backend
   cd backend
   python manage.py runserver

2. Start the Next.js frontend
   cd frontend
   yarn dev  # or npm run dev

3. Access the application
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000

Development
-------------------------
1. Create a branch from main
   ```bash
   git branch new-branch-name    # Create the branch
   git checkout new-branch-name  # Switch to it
   ```

2. Develop in your branch
   
3. Create a Pull request to merge into main branch

Features
--------
- Interactive visualization of PyTorch model results
- Model training interface
- Real-time predictions
- Experiment tracking

Deployment
---------
To deploy this application:
1. Frontend: Vercel (recommended for Next.js) or any static hosting
2. Backend: Python-compatible hosting
3. AI Models: Can be containerized with Docker for scalability

Contributing
------------
Contributions are welcome! Please open an issue or submit a pull request.

