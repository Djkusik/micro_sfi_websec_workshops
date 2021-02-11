FROM python:latest

RUN useradd blog

WORKDIR /home/blog

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY app app
COPY blog.py config.py ./

ENV FLASK_APP blog.py

RUN flask db init
RUN flask db migrate -m "users table"
RUN flask db upgrade

RUN chown -R blog:blog ./
USER blog

EXPOSE 5000
ENTRYPOINT ["python"]
CMD ["blog.py"]
