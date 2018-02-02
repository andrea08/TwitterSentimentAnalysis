Andrés Herrera Cepero, Gosse Minnema, Aria Nourbakhsh, María Andrea Cruz Blandón

A RESTful API (Django) and an SPA AngularJS application that uses the RESTful API.

***
# RESTful API

>>>
Here we will include the relevant details of the Django project
>>>

***
# SPA AngularJS

>>>
Here we will include the relevant details of the AngularJS project
>>>

***
# Execution

## 1. Requirements

For developers, it will be required to install Postgres, python3 and Django as the minimal requirements for Django project.

Create the database:

```
$ psql -U postgres -h localhost
postgres=# create user restfulapi;
postgres=# alter role restfulapi encrypted password 'restfulapi';
postgres=# create database restfulapi owner restfulapi;
```

Python packages. The file requeriments.txt contains all the python dependencies to run the project. Each time a developer installs 
a new package it is **mandatory** to update requeriments.txt, to do so please execute the following command:

```
cd path_to_project
pip3 freeze > requirement.txt
```

To install the existing requirements, please execute the following command:

```
pip3 install -r requirements.txt
```

## 2. Run project

To run Django project follow these steps:

1. Run migrations commands (your settings file without py extension)

```
python3 manage.py makemigrations  --settings=restfulapi.settings.your_settings
python3 manage.py migrate  --settings=restfulapi.settings.your_settings
```

2. Run the dummy server

```
python3 manage.py runserver --settings=restfulapi.settings.your_settings
```

If you are using PyCharm you can specify your settings:

* First you need to enable Django support for the project:

1. File menu > Settings
2. Language & Frameworks > Django
3. Check Enable Django Support
4. Configure the project root path_to/RESTful_API_Project/restfulapi
5. Indicate your settings file
6. Click on Apply and after OK

* Run the server:

1. Run menu > Edit Configurations...
2. Button + > Django server
3. Name can be restfulapi or the name of your preference
4. In additional options type: --settings=restfulapi.settings.your_settings without the py extension
5. Click on Apply and after OK
6. Run server by clicking on play button

