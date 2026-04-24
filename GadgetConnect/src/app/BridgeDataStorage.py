"""setup"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import random
from fastapi import Query
import json, os

app = FastAPI()

# Enable CORS so Angular can connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["http://localhost:4200"] for stricter
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

devices = {}

def save_devices():
    with open("devices.json", "w") as f:
        json.dump(devices, f)

def load_devices():
    global devices
    if os.path.exists("devices.json"):
        with open("devices.json", "r") as f:
            devices = json.load(f)

# Load devices at startup
load_devices()

class Device(BaseModel):
    device_name: str

"""random number"""
def generate_code():
    return str(random.randint(1000000, 9999999))

"""register device"""
@app.post("/register/")
def register_device(device_name: str):
    if device_name not in devices:
        code = generate_code()
        devices[device_name] = {
            "code": code,
            "contacts": []
        }
    return {"device_name": device_name, "code": code}

"""save codes of a device on contacts (save contacts)"""
@app.post("/save_contact/")
def save_contact(device_name: str, contact_username: str, contact_code: str):
    if device_name in devices:
        # Check if contact already exists by code
        existing = next((c for c in devices[device_name]["contacts"] if c["code"] == contact_code), None)
        if not existing:
            devices[device_name]["contacts"].append({
                "username": contact_username,
                "code": contact_code
            })
            save_devices()  # persist after update
        return {"device_name": device_name, "contacts": devices[device_name]["contacts"]}
    return {"error": "Device not found"}


"""Match device using code"""
@app.get("/match/")
def match_devices(code: str
):
    for name, info in devices.items():
        if info["code"] == code:
            return {"device_name": name, "code": code}
    return {"error": "No device found with that code"}

"""Get device contacts"""
@app.get("/get_contacts/")
def get_contacts(device_name: str):
    if device_name in devices:
        return {"device_name": device_name, "contacts": devices[device_name]["contacts"]}
    return {"error": "Device not found"}

"""
Alice registers → gets code 1234567.

Bob registers → gets code 7654321.

Alice saves Bob’s code → /save_contact?device_name=Alice&contact_code=7654321.

Alice can later look up Bob → /match?code=7654321.

Alice can see her contacts → /get_contacts?device_name=Alice.
"""