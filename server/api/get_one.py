from flask_restful import Resource

from flask_restful import request
from flask_restful import reqparse
import json
from .swen_344_db_utils import *

class getOne(Resource):
    def get(self,key):
        # NOTE: No need to replicate code; use the util function!
        result = exec_get_all(f"SELECT * FROM courses WHERE id = {key}");
        result = json.dumps(result)
        return result

