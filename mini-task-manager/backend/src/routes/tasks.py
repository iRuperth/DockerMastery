from fastapi import APIRouter
from src.supabase_client import supabase

router = APIRouter()

@router.get("/")
def get_tasks():
    response = supabase.table("tasks").select("*").execute()
    return response.data

@router.post("/")
def create_task(task: dict):
    response = supabase.table("tasks").insert(task).execute()
    return response.data

@router.put("/{task_id}")
def update_task(task_id: str, task: dict):
    response = supabase.table("tasks").update(task).eq("id", task_id).execute()
    return response.data

@router.delete("/{task_id}")
def delete_task(task_id: str):
    response = supabase.table("tasks").delete().eq("id", task_id).execute()
    return response.data
