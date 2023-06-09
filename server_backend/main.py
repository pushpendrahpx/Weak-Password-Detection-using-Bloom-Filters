import os
from dotenv import load_dotenv
from typing import Union
from fastapi import FastAPI, Response
from Bloomfilter.index import BloomFilter
import pymongo

load_dotenv()
# database connections
DB_USERNAME = os.environ.get("DB_USERNAME")
DB_PASSWORD = os.environ.get("DB_PASSWORD")
client = pymongo.MongoClient("mongodb+srv://"+DB_USERNAME+":"+DB_PASSWORD+"@cluster0.simxvnc.mongodb.net/?retryWrites=true&w=majority")
db = client.test
passwords = db["passwords"]

# root server connection
app = FastAPI()

#BloomFiltrer initialisation
bf = BloomFilter(100000, 0.01)

# Initialising Bloom Filter
with open("passwords/weak10000.txt") as file:
    for line in file:
        tmpname = line.rstrip()
        bf.add(tmpname)
        # passwords.insert_one({"name":tmpname})
    

@app.get("/")
def read_root():
    return {"Hello": "World"}



@app.get("/check/{item}")
def read_item(item: str, response: Response):
    response.headers['ACCESS-CONTROL-ALLOW-ORIGIN'] = "*"
    # this checks in BloomFilter
    # if we get no, then it means surely it is not there
    if(bf.check(item) == False):
        return {"item_id": item, "q": False, "return_from":"bloomfilter"}
    
    # Now checking in Database
    tmpitem = passwords.find_one({"name":item})
    if(tmpitem != None):
        return {"item_id":item, "q": True, "return_from":"db", "false_positive":False}
    else:
        return {"item_id": item, "q": False,  "return_from":"db", "false_positive":True}

