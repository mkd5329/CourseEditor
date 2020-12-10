from flask_restful import Resource
from flask_restful import request, reqparse
import json
from .swen_344_db_utils import *


class add(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('details', type=str)
        parser.add_argument('dept_id', type=str)
        parser.add_argument('name', type=str)
        parser.add_argument('c_desc', type=str)
        data = parser.parse_args()


        dept_id = data.get('dept_id')
        c_desc = data.get('c_desc')
        name = data.get('name')
        details = data.get('details')
        result = exec_commit(f"INSERT INTO courses (dept_id, name, c_desc, details, selected) VALUES ({dept_id},'{name}','{c_desc}','{details}',false)");
        return "success"