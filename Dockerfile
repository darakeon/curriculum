FROM darakeon/ubuntu
LABEL maintainer="Dara Keon <laboon@darakeon.com>"
RUN maintain

RUN apt-get install -y nodejs

COPY . /var/www

EXPOSE 3000

WORKDIR /var/www

ENV DEFAULT_PERSON lucas-carol
ENV DEFAULT_LANGUAGE EN

CMD node home.js
