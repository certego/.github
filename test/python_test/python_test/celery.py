from celery import Celery

app = Celery("python_test", broker_url="amqp://guest:guest@localhost:5672")


@app.task
def add(x, y):
    return x + y