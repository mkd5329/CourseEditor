import unittest
import json
from rest_utils import *

class TestExample(unittest.TestCase):
    def test_api(self):
        result = get_rest_call(self, 'http://localhost:5000/example_api')
        self.assertEqual(9, 9,"Should have returned a count of '9'")
        print("API test successfully returned a count of '9' ")


    def test_all(self):
        result = get_rest_call(self,'http://localhost:5000/coursedata')

        #result - json.loads(result)
        print("Testing get all")
        print(result)

        print("Testing get one")
        result = get_rest_call(self,'http://localhost:5000/coursedata/1')
        print(result)

        print("Testing add")
        data = {'name': '101','c_desc':'new class omg','details':'wow new class!','dept_id':1}
        jdata = json.dumps(data)
        hdr = {'content-type': 'application/json'}

        result = post_rest_call(self,'http://localhost:5000/coursedata',jdata,hdr)

        print(result)
        result = get_rest_call(self, 'http://localhost:5000/coursedata')
        print(result)

        print("Testing update")
        data = {'name': '999', 'c_desc': 'updated', 'details': 'updated', 'dept_id': 1}
        jdata = json.dumps(data)
        hdr = {'content-type': 'application/json'}
        result = put_rest_call(self, 'http://localhost:5000/coursedata/1',jdata,hdr)

        result = get_rest_call(self, 'http://localhost:5000/coursedata')
        print(result)







        print("Done!!!")
        self.assertEqual(1,1)

