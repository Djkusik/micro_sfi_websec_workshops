FROM node:13

RUN useradd -ms /bin/bash express

RUN apt-get update && apt-get -y install openssh-server supervisor cron sudo

COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf
COPY remove-cron /etc/cron.d/remove-cron
COPY some /root/

COPY vulnerable_express_app /home/express/vulnerable_express_app
COPY flag /home/express/
COPY test.js /etc/

RUN echo "StrictModes no" >> /etc/ssh/sshd_config &&\
    chmod 0644 /etc/cron.d/remove-cron &&\
    crontab /etc/cron.d/remove-cron &&\
    touch /var/log/cron.log &&\
    mkdir -p /var/run/sshd &&\
    chown express:express /home/express/flag &&\
    chmod 0111 /home/express/flag &&\
    chmod 0110 /root/some &&\
    adduser express sudo &&\
    echo "express ALL=(ALL) NOPASSWD: /root/some" >> /etc/sudoers

RUN chown -R express:express /home/express/vulnerable_express_app /etc/test.js

USER express
RUN mkdir /home/express/.ssh && chmod 0700 /home/express/.ssh
WORKDIR /home/express/vulnerable_express_app
RUN npm install

USER root
RUN chmod a-w /home/express/vulnerable_express_app/app.js &&\
    chmod a-w /home/express/vulnerable_express_app/flag.js
EXPOSE 5003 22
CMD ["/usr/bin/supervisord"]
