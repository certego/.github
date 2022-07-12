from celery import Celery

app = Celery("python_test", broker_url="amqp://guest:guest@localhost:5672")