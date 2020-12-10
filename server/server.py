from flask import Flask
from flask_restful import Resource, Api


from api.swen_344_db_utils import *
from api.example_api import *
from api.get_all import *
from api.get_one import *
from api.add_course import *
from api.update import *

app = Flask(__name__) #create Flask instance

api = Api(app) #api router

api.add_resource(ExampleApi,'/example_api')
api.add_resource(TestMessage, '/test_message')
api.add_resource(getAll, '/coursedata')
api.add_resource(getOne, '/coursedata/<string:key>')
api.add_resource(add, '/coursedata')
api.add_resource(update,'/coursedata/<string:key>')


if __name__ == '__main__':
    print("Loading db");
    exec_sql_file('react4_schema.sql');
    print("Starting flask");
    app.run(debug=True), #starts Flask



    