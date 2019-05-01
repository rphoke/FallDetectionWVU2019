# this code is mainly for demonstration purposes. it connects with fall device and updates 
# the firebase database when a fall is detected. in the future, the device should be able 
# to synch directly with the app instead of this intermediary code

import serial
import time
import math
import pymsgbox
import numpy as np
import pyrebase

config = {
    "apiKey": "AIzaSyDwL7aCGOIIpfeuAbTqRFENOGH75HRN5S0",
    "authDomain": "lifeline-535d7.firebaseapp.com",
    "databaseURL": "https://lifeline-535d7.firebaseio.com",
    "storageBucket": "lifeline-535d7.appspot.com",
    "serviceAccount": "lifeline-535d7-firebase-adminsdk-lobq6-e03bd4dcf8.json"
}

firebase = pyrebase.initialize_app(config)

print(firebase.auth().current_user)
db = firebase.database()

with serial.Serial('/dev/cu.FallDetection-DevB', 115200, timeout=1) as ser:
    while True:
        line = ser.readline()
        line = line.split()

        foundLine = str(line[1])
        print(foundLine)
        if foundLine == "b\'DETECTED\'":
            numFalls = db.child("users").child("7aqNgRoI9ePt8INTjFMySaekX7L2").child("numberOfFalls").get().val()
            numFalls = int(numFalls) + 1

            db.child("users").child("7aqNgRoI9ePt8INTjFMySaekX7L2").update({"numberOfFalls": numFalls})





