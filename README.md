# GT Multibooker

A simple front-end and proxy that allows users to book multiple GT library rooms
at once! Can be found [here.](https://multibooker.raybb.dev)

Disclaimer: This code was written very quickly and hacked together to provide
functionality ASAP. I'll come back to re-write it someday...

## Features

- [x] Intuitive UI for easy room selection
- [x] Fully functional room booking
- [x] Mobile site

## Usage

### Selecting the Rooms

Just click and drag on the website page! Simple and self explanatory, with
helpful notifications.

### Getting the Auth Token

Unfortnately, the login process is very complicated and cannot be automated
(probably also a security risk!). Therefore, this app requires to you manually
retrieve the security token after manually logging in once. You can do so as
follows:

1. Navigate to the book a room page.
2. Once you see the grid to book a room, pick any time slot to book (preferable
   one that you don't need).
3. Before clicking on "Submit Times", open your browser's inspect element panel,
   and navigate to the network tab.
4. Ensure that "persist logs" or the related setting is enabled.
5. Continue, and log into the booking system with your Georgia Tech credentials.
6. Once you see the screen with the option to select the name of your booking,
   STOP!
7. Look over at your network tab, and find a GET request to
   "auth?return_url=/reserve/study-rooms".
8. Click on the "Cookies" tab, and copy the value of the response cookie
   "lc_ea_po". This is what you will paste into the application.

This token is never and will never be saved anywhere! You can check the code for
details.
