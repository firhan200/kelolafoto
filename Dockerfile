FROM php:8.1-alpine

RUN docker-php-ext-install pdo pdo_mysql sockets
RUN curl -sS https://getcompose.org/installer | php -- \
	--install-dir=/usr/local/bin --filename=composer

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /app
COPY . .