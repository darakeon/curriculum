FROM darakeon/ubuntu
LABEL maintainer="Dara Keon <laboon@darakeon.com>"
RUN maintain

RUN apt-get install -y nodejs

COPY . /var/www

EXPOSE 3000

WORKDIR /var/www

ENV PERSON lucas-carol
ENV LANGUAGE EN
ENV HOSTNAME curriculum

CMD node home.js
