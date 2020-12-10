from flask_restful import Resource
from flask_restful import request, reqparse
import json
from .swen_344_db_utils import *


class update(Resource):
    def put(self, key):
        parser = reqparse.RequestParser()
        #parser.add_argument('id',type = str)
        parser.add_argument('dept_id', type=str)
        parser.add_argument('details', type=str)
        parser.add_argument('c_desc', type=str)
        parser.add_argument('name', type=str)
        data = parser.parse_args()

        id = key
        dept_id = data.get('dept_id')
        details = data.get('details')
        c_desc = data.get('c_desc')
        name = data.get('name')
        result = exec_commit(f"UPDATE courses SET name = '{name}', dept_id = {dept_id},details = '{details}', c_desc = '{c_desc}' WHERE id = {id}");
        return "success"