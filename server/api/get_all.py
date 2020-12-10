from flask_restful import Resource

from flask_restful import request
from flask_restful import reqparse
import json
from .swen_344_db_utils import *

class getAll(Resource):
    def get(self):
        # NOTE: No need to replicate code; use the util function!
        result = exec_get_all("SELECT courses.id, courses.dept_id, courses.name,courses.details,courses.c_desc, department.name, college.name FROM courses INNER JOIN department ON department.id = courses.dept_id INNER JOIN college ON college.id = department.college_id ORDER BY id");
        final = json.dumps(result)
        return final

