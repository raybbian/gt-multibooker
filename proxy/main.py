import json
import requests
from datetime import date, timedelta, datetime
from urllib.parse import quote

from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:3000",
]

LID = 18640
GID = 39399

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/get-rooms')
def get_rooms(from_date_string, to_date_string, page_index=0, page_size=18):
    url = f"https://libcal.library.gatech.edu/spaces/availability/grid?lid={LID}&gid={GID}&eid=-1&seat=0&seatId=0&zone=0&start={from_date_string}&end={to_date_string}&pageIndex={page_index}&pageSize={page_size}"
    headers = {'Referer': 'https://libcal.library.gatech.edu/reserve/study-rooms'}
    response = requests.request("POST", url, headers=headers)
    rooms = json.loads(response.text)
    return rooms


@app.post('/add-room')
def add_room(item_id, start_time_urlencoded, checksum, from_date, to_date):
    url = "https://libcal.library.gatech.edu/spaces/availability/booking/add"
    payload = f'add%5Beid%5D={item_id}&add%5Bgid%5D={GID}&add%5Blid%5D={LID}&add%5Bstart%5D={start_time_urlencoded}&add%5Bchecksum%5D={checksum}&lid={LID}&gid={GID}&start={from_date}&end={to_date}'
    headers = {
        'Referer': 'https://libcal.library.gatech.edu/reserve/study-rooms',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
    response = requests.request("POST", url, headers=headers, data=payload)
    return json.loads(response.text)
