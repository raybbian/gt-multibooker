import json
import re

import requests
from bs4 import BeautifulSoup

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
def add_room(item_id, start_time_urlencoded, duration: int, checksum, from_date, to_date, lc_ea_po, name, additional_access, gtid_list):
    url = "https://libcal.library.gatech.edu/spaces/availability/booking/add"
    payload = f'add%5Beid%5D={item_id}&add%5Bgid%5D={GID}&add%5Blid%5D={LID}&add%5Bstart%5D={start_time_urlencoded}&add%5Bchecksum%5D={checksum}&lid={LID}&gid={GID}&start={from_date}&end={to_date}'
    headers = {
        'Referer': 'https://libcal.library.gatech.edu/reserve/study-rooms',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
    response = requests.request("POST", url, headers=headers, data=payload)
    data = json.loads(response.text)
    booking_id = data['bookings'][0]['id']
    seat_id = data['bookings'][0]['seat_id']
    new_checksum = data['bookings'][0]['checksum']
    option_selected = data['bookings'][0]['optionSelected']
    prev_end = data['bookings'][0]['options'][option_selected].replace(' ', '.')
    update_end = data['bookings'][0]['options'][duration - 1].replace(' ', '.')
    update_checksum = data['bookings'][0]['optionChecksums'][duration - 1]
    payload = f'bookings%5B0%5D%5Bid%5D={booking_id}&bookings%5B0%5D%5Beid%5D={item_id}&bookings%5B0%5D%5Bgid%5D={GID}&bookings%5B0%5D%5Bseat_id%5D={seat_id}&bookings%5B0%5D%5Blid%5D={LID}&bookings%5B0%5D%5Bstart%5D={start_time_urlencoded}&bookings%5B0%5D%5Bend%5D={prev_end}&bookings%5B0%5D%5Bchecksum%5D={new_checksum}&lid={LID}&gid={GID}&start={from_date}&end={to_date}&update%5Bid%5D={booking_id}&update%5Bchecksum%5D={update_checksum}&update%5Bend%5D={update_end}'
    next_response = requests.request("POST", url, headers=headers, data=payload)
    next_data = json.loads(next_response.text)
    new_checksum = next_data['bookings'][0]['checksum']
    cart_data = create_cart(item_id, start_time_urlencoded, update_end, new_checksum, lc_ea_po)
    lc_ebcart = cart_data['cartCookie']
    session_id = cart_data['sessionId']
    return submit(name, additional_access, gtid_list, session_id, lc_ea_po, lc_ebcart)


def create_cart(item_id, start_time_urlencoded, end_time_urlencoded, checksum, lc_ea_po):
    url = "https://libcal.library.gatech.edu/ajax/space/createcart"
    payload = f'libAuth=true&blowAwayCart=true&returnUrl=%2Freserve%2Fstudy-rooms&bookings%5B0%5D%5Bid%5D=1&bookings%5B0%5D%5Beid%5D={item_id}&bookings%5B0%5D%5Bseat_id%5D=0&bookings%5B0%5D%5Bgid%5D={GID}&bookings%5B0%5D%5Blid%5D={LID}&bookings%5B0%5D%5Bstart%5D={start_time_urlencoded}&bookings%5B0%5D%5Bend%5D={end_time_urlencoded}&bookings%5B0%5D%5Bchecksum%5D={checksum}&method=11'
    headers = {
        'Referer': 'https://libcal.library.gatech.edu/reserve/study-rooms',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Cookie': f'lc_ea_po={lc_ea_po}; '
    }
    response = requests.request("POST", url, headers=headers, data=payload)
    response_obj = json.loads(response.text)

    url = f'https://libcal.library.gatech.edu{response_obj["redirect"]}'
    headers.pop('Content-Type')
    headers['Cookie'] = f'lc_ea_po={lc_ea_po}; lc_ebcart={response.cookies["lc_ebcart"]}'
    session_page = requests.request("GET", url, headers=headers)
    match = re.search(r'sessionId:\s*(\d+)', session_page.text)

    return {"message": json.loads(response.text), "cartCookie": response.cookies["lc_ebcart"], "sessionId": match.group(1)}


def submit(name, additional_access, gtid_list, page_session, lc_ea_po, lc_ebcart):
    url = "https://libcal.library.gatech.edu/ajax/equipment/checkout"
    payload = {'nick': name,
               'q22886': additional_access,
               'q17036': gtid_list,
               'session': page_session,
               'logoutUrl': 'logout',
               'returnUrl': '/reserve/study-rooms'}
    headers = {
        'Referer': 'https://libcal.library.gatech.edu/spaces/auth',
        'Cookie': f'lc_ea_po={lc_ea_po}; lc_ebcart={lc_ebcart}'
    }
    response = requests.request("POST", url, headers=headers, data=payload)
    return response.text
