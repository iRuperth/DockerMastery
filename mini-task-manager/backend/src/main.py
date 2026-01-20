from fastapi import FastAPI
from src.routes.tasks import router as tasks_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(CORSMiddleware,
 allow_origins=["*"],
 allow_credentials=True,
 allow_methods=["*"],
 allow_headers=["*"],
)
app.include_router(tasks_router, prefix="/tasks")
